#!/bin/bash

# --- 重要: 假设以下变量在脚本外部或通过调用方式定义 ---
# BASE_PATH (通常是脚本所在的目录，例如: /home/runner/work/wrt_release/wrt_release)
# TARGET_DIR (通常是 ./action_build/build_dir/target-aarch64_cortex-a53_musl/...)
# MODEL_NAME (通常是传入的参数，例如: Arthur_Athena_immwrt)

# --- 脚本开始 ---

# 1. 清理目标目录 (如果存在)
echo "Step 1: Cleaning target directory..."
if [[ -d "$TARGET_DIR" ]]; then
    echo "Found existing target directory: $TARGET_DIR"
    find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec rm -f {} +
    echo "Cleaned old firmware files from $TARGET_DIR"
else
    echo "Target directory $TARGET_DIR does not exist or is not a directory."
fi

# 2. 执行 make download
echo "Step 2: Running make download..."
make download -j$(($(nproc) * 2))
if [ $? -ne 0 ]; then
    echo "ERROR: 'make download' failed with exit code $?."
    exit 1
fi
echo "make download completed successfully."

# 3. 执行 make 构建 (优先使用多核，失败则回退单核)
echo "Step 3: Running main build process..."
make -j$(($(nproc) + 1))
if [ $? -ne 0 ]; then
    echo "INFO: Main build failed (exit code $?). Trying single-threaded build with verbose output..."
    make -j1 V=s
    if [ $? -ne 0 ]; then
        echo "ERROR: Single-threaded build also failed with exit code $?."
        exit 1 # 关键：如果构建失败，脚本应退出
    else
        echo "Single-threaded build succeeded."
    fi
else
    echo "Main build completed successfully."
fi

# 4. 设置固件目录
echo "Step 4: Setting up firmware directory..."
FIRMWARE_DIR="$BASE_PATH/firmware"
rm -rf "$FIRMWARE_DIR"
mkdir -p "$FIRMWARE_DIR"
echo "Created firmware directory: $FIRMWARE_DIR"

# 5. 复制构建产物
echo "Step 5: Copying firmware files..."
find "$TARGET_DIR" -type f \( -name "*.bin" -o -name "*.manifest" -o -name "*efi.img.gz" -o -name "*.itb" -o -name "*.fip" -o -name "*.ubi" -o -name "*rootfs.tar.gz" \) -exec cp -f {} "$FIRMWARE_DIR/" \;
if [ $? -ne 0 ]; then
    echo "WARNING: Failed to copy some firmware files. Check if TARGET_DIR is correct or if files were built."
    # Note: Not exiting here as we want to proceed with artifact upload if possible
else
    echo "Successfully copied firmware files to $FIRMWARE_DIR"
fi

# --- 脚本结束 ---

echo "Build script execution finished."
