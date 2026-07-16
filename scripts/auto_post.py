#!/usr/bin/env python3
"""
Auto-post script for NewsPress Next.js Blog
Creates Markdown files in content/posts/ from news data
"""

import os
import re
import sys
from datetime import datetime

CONTENT_DIR = r"C:\Users\Administrator\next-blog\content\posts"

def slugify(title):
    """Convert title to URL-friendly slug"""
    slug = title.lower()
    slug = re.sub(r'[đĐ]', 'd', slug)
    slug = re.sub(r'[àáạảãâầấậẩẫăằắặẳẵ]', 'a', slug)
    slug = re.sub(r'[èéẹẻẽêềếệểễ]', 'e', slug)
    slug = re.sub(r'[ìíịỉĩ]', 'i', slug)
    slug = re.sub(r'[òóọỏõôồốộổỗơờớợởỡ]', 'o', slug)
    slug = re.sub(r'[ùúụủũưừứựửữ]', 'u', slug)
    slug = re.sub(r'[ỳýỵỷỹ]', 'y', slug)
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug.strip())
    slug = re.sub(r'-+', '-', slug)
    return slug[:80]

def create_post(title, content, category="Tin tức", author="NewsPress AI", image=""):
    """Create a Markdown post file"""
    slug = slugify(title)
    date_str = datetime.now().strftime("%Y-%m-%d")
    
    if not image:
        image = "https://images.unsplash.com/photo-1504711434969-e33886168d6c?w=1200&q=80"
    
    filepath = os.path.join(CONTENT_DIR, f"{slug}.md")
    
    if os.path.exists(filepath):
        print(f"⚠️ Post already exists: {slug}")
        return filepath
    
    frontmatter = f"""---
title: "{title}"
date: "{date_str}"
category: "{category}"
author: "{author}"
image: "{image}"
---

{content}
"""
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(frontmatter)
    
    print(f"✅ Created: {slug}")
    return filepath


if __name__ == "__main__":
    # Example: create a test post
    title = "Tin nóng hôm nay: Cập nhật những sự kiện đáng chú ý"
    content = """## Điểm tin nhanh

Dưới đây là tổng hợp những tin tức đáng chú ý trong ngày hôm nay.

### Tin trong nước

- Kinh tế Việt Nam tiếp tục đà phục hồi mạnh mẽ
- Các địa phương đẩy mạnh chuyển đổi số

### Tin quốc tế

- Thị trường chứng khoán châu Á tăng điểm
- Công nghệ AI tiếp tục là tâm điểm đầu tư toàn cầu

### Thể thao

- Bóng đá Việt Nam chuẩn bị cho các giải đấu quốc tế

---

> *Bài viết được tạo tự động bởi NewsPress AI.*"""
    
    create_post(title, content)
    print("Done!")
