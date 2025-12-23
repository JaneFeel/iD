#!/bin/bash

# 下载 config/id.js 中第4-10行定义的所有外部数据包
# Download all external data packages defined in lines 4-10 of config/id.js

set -e

# 创建下载目录
DOWNLOAD_DIR="./dist_packages"
mkdir -p "$DOWNLOAD_DIR"

echo "开始下载外部数据包到 $DOWNLOAD_DIR ..."
echo "Starting to download external data packages to $DOWNLOAD_DIR ..."
echo ""

# 1. @openstreetmap/id-tagging-schema (presets)
echo "1. 下载 @openstreetmap/id-tagging-schema (presets)..."
PRESETS_VERSION=${1:-"6.7.1"}  # 默认版本，可以通过参数指定
PRESETS_DIR="$DOWNLOAD_DIR/id-tagging-schema"
mkdir -p "$PRESETS_DIR"
echo "   版本: $PRESETS_VERSION"
curl -L "https://registry.npmjs.org/@openstreetmap/id-tagging-schema/-/id-tagging-schema-${PRESETS_VERSION}.tgz" -o "$PRESETS_DIR/package.tgz"
tar -xzf "$PRESETS_DIR/package.tgz" -C "$PRESETS_DIR"
rm "$PRESETS_DIR/package.tgz"
echo "   ✓ 完成"
echo ""

# 2. osm-community-index (oci)
echo "2. 下载 osm-community-index (oci)..."
OCI_VERSION=${2:-"5.8.0"}  # 默认版本，可以通过参数指定
OCI_DIR="$DOWNLOAD_DIR/osm-community-index"
mkdir -p "$OCI_DIR"
echo "   版本: $OCI_VERSION"
curl -L "https://registry.npmjs.org/osm-community-index/-/osm-community-index-${OCI_VERSION}.tgz" -o "$OCI_DIR/package.tgz"
tar -xzf "$OCI_DIR/package.tgz" -C "$OCI_DIR"
rm "$OCI_DIR/package.tgz"
echo "   ✓ 完成"
echo ""

# 3. wmf-sitematrix
echo "3. 下载 wmf-sitematrix..."
WMF_VERSION=${3:-"0.1.5"}  # 默认版本，可以通过参数指定
WMF_DIR="$DOWNLOAD_DIR/wmf-sitematrix"
mkdir -p "$WMF_DIR"
echo "   版本: $WMF_VERSION"
curl -L "https://registry.npmjs.org/wmf-sitematrix/-/wmf-sitematrix-${WMF_VERSION}.tgz" -o "$WMF_DIR/package.tgz"
tar -xzf "$WMF_DIR/package.tgz" -C "$WMF_DIR"
rm "$WMF_DIR/package.tgz"
echo "   ✓ 完成"
echo ""

# 4. name-suggestion-index (nsi)
echo "4. 下载 name-suggestion-index (nsi)..."
NSI_VERSION=${4:-"6.0.20241218"}  # 默认版本，可以通过参数指定
NSI_DIR="$DOWNLOAD_DIR/name-suggestion-index"
mkdir -p "$NSI_DIR"
echo "   版本: $NSI_VERSION"
curl -L "https://registry.npmjs.org/name-suggestion-index/-/name-suggestion-index-${NSI_VERSION}.tgz" -o "$NSI_DIR/package.tgz"
tar -xzf "$NSI_DIR/package.tgz" -C "$NSI_DIR"
rm "$NSI_DIR/package.tgz"
echo "   ✓ 完成"
echo ""

echo "=========================================="
echo "所有包下载完成！"
echo "All packages downloaded successfully!"
echo ""
echo "下载位置 / Download location:"
echo "  $DOWNLOAD_DIR/"
echo ""
echo "包含的包 / Packages included:"
echo "  1. id-tagging-schema ($PRESETS_VERSION)"
echo "  2. osm-community-index ($OCI_VERSION)"
echo "  3. wmf-sitematrix ($WMF_VERSION)"
echo "  4. name-suggestion-index ($NSI_VERSION)"
echo ""
echo "使用方法 / Usage:"
echo "  默认版本: ./scripts/download_dist_packages.sh"
echo "  指定版本: ./scripts/download_dist_packages.sh <presets_version> <oci_version> <wmf_version> <nsi_version>"
echo "  示例: ./scripts/download_dist_packages.sh 6.7.1 5.8.0 0.1.5 6.0.20241218"
echo "=========================================="
