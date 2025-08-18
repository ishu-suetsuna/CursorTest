#!/usr/bin/env python3
"""
CursorTest - Cursorの機能をテストするためのスクリプト
"""

import sys
import os
from datetime import datetime

def test_basic_functionality():
    """基本的な機能をテスト"""
    print("🚀 CursorTest を開始します...")
    print(f"Python バージョン: {sys.version}")
    print(f"現在の作業ディレクトリ: {os.getcwd()}")
    print(f"現在時刻: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    return True

def test_file_operations():
    """ファイル操作をテスト"""
    print("\n📁 ファイル操作テスト:")
    
    # テストファイルの作成
    test_content = "これはCursorTestで作成されたテストファイルです。"
    with open("test_output.txt", "w", encoding="utf-8") as f:
        f.write(test_content)
    print("✅ テストファイルを作成しました")
    
    # ファイルの読み込み
    with open("test_output.txt", "r", encoding="utf-8") as f:
        content = f.read()
    print(f"✅ ファイルを読み込みました: {content}")
    
    return True

def test_directory_operations():
    """ディレクトリ操作をテスト"""
    print("\n📂 ディレクトリ操作テスト:")
    
    # テストディレクトリの作成
    test_dir = "test_directory"
    if not os.path.exists(test_dir):
        os.makedirs(test_dir)
        print(f"✅ テストディレクトリを作成しました: {test_dir}")
    else:
        print(f"ℹ️ テストディレクトリは既に存在します: {test_dir}")
    
    # ディレクトリ内のファイル一覧
    files = os.listdir(".")
    print(f"✅ 現在のディレクトリのファイル一覧: {files}")
    
    return True

def cleanup_test_files():
    """テストファイルをクリーンアップ"""
    print("\n🧹 テストファイルのクリーンアップ:")
    
    # テストファイルの削除
    if os.path.exists("test_output.txt"):
        os.remove("test_output.txt")
        print("✅ test_output.txt を削除しました")
    
    # テストディレクトリの削除
    test_dir = "test_directory"
    if os.path.exists(test_dir):
        import shutil
        shutil.rmtree(test_dir)
        print(f"✅ {test_dir} を削除しました")
    
    return True

def main():
    """メイン関数"""
    print("=" * 50)
    print("🎯 CursorTest 実行中...")
    print("=" * 50)
    
    try:
        # 基本機能テスト
        test_basic_functionality()
        
        # ファイル操作テスト
        test_file_operations()
        
        # ディレクトリ操作テスト
        test_directory_operations()
        
        # クリーンアップ
        cleanup_test_files()
        
        print("\n" + "=" * 50)
        print("🎉 すべてのテストが完了しました！")
        print("=" * 50)
        
    except Exception as e:
        print(f"\n❌ エラーが発生しました: {e}")
        return False
    
    return True

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
