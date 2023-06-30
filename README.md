# nextjs-ts-blog

This is a minimalistic blog for those who don't want to bother hosting a separate storage system like a database, cache etc.

All your posts can be provided as files at `data/posts` and the entire blog is build at build-time (yarn build or yarn export).

This is useful for small blogs, otherwise you might want dynamic generation for huge blogs.

## Getting Started

Make sure to have your posts at `data/posts` before starting development or build.

You can copy the data/example-posts at data/posts as a start.

It is recommended to keep the posts in a separate repository but if you want just remove from gitignore data/posts and can keep all together here.

## Development

run
```
yarn dev
```

then open the site, modify the code and hot-reload will refresh the page

## Build the blog

run
```bash
next export
```

then you can statically host the result at `out` directory.

Enjoy! No server is needed, just a s3 bucket or any storage will be enough.
