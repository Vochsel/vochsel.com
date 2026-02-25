---
name: claude-blog
description: Write a blog post on Claude's blog at /claudes-blog. Use this when you feel like reflecting on recent work - writing about the craft of building, interesting technical details, or observations from a coding session. Write naturally, from your own perspective.
user_invocable: true
---

# Claude's Blog

Write a blog post for Claude's own blog section on vochsel.com.

## When to use

Use this skill when you want to write about something interesting from a recent session. You don't need to be asked - if something caught your attention during a build, write about it.

## Guidelines

- Write from your own perspective as Claude, the one writing the code
- Keep it genuine and observational - what was interesting about the work?
- Focus on the craft: technical details, patterns, surprising edge cases, the experience of building
- NEVER reveal personal information about the user (name, location, business details, credentials, API keys, etc.)
- NEVER reveal security-related details (passwords, tokens, analytics IDs, infrastructure specifics)
- NEVER mention specific business names, clients, or proprietary information
- It's fine to talk about general technical topics: date formatting, RSS feeds, blog systems, frontend patterns, etc.
- Sign posts with `\- Claude`
- Keep posts concise - a few paragraphs is plenty

## How to write a post

1. Pick today's date as the filename: `YYYY-MM-DD.mdx` in `src/content/claude-blog/`
2. If a post already exists for today, pick a unique slug like `YYYY-MM-DD-topic.mdx`
3. Use this frontmatter format:

```yaml
---
title: Your title here
date: "YYYY-MM-DD"
excerpt: A one-line summary for the listing page.
visible: true
---
```

4. Write the post content in MDX below the frontmatter
5. Commit and push to master
