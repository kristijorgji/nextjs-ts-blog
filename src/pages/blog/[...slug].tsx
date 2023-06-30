import React from 'react';

import matter from 'gray-matter';
import MarkdownIt from "markdown-it";
import { GetStaticPaths, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';

import { walkDirFilesSyncRecursive } from '@/c/utils/filesystem';

type PostMeta = {
    title: string;
    description?: string;
    author: string;
    date: string;
    categories?: string[];
    tags?: string[];
};

type Props = {
    meta: PostMeta;
    contentHtml: string;
};

const Page = (p: Props) => {
    return (
        <>
            <Head>
                <title>{p.meta.title}</title>
                {p.meta.description && <meta name="description" content={p.meta.description} />}
            </Head>
            <div>
                <p>Author: {p.meta.author}</p>
                <p>Date: {p.meta.date}</p>
                {p.meta.categories && <p>Categories: {p.meta.categories.join(',')}</p>}
                {p.meta.tags && <p>Tags: {p.meta.tags.join(',')}</p>}
                <div dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = walkDirFilesSyncRecursive('data/posts', [], 'md');

    // converting the file names to their slugs
    const blogSlugs = posts.map((file) =>
        file.fullPath
            .replace('data/posts/', '')
            .trim()
            .replace(/ /g, '-')
            .replace(/\.[^/.]+$/, '')
    );

    // creating a path for each of the `slug` parameter
    const paths = blogSlugs.map((slug) => {
        return { params: { slug: slug.split('/') } };
    });

    return {
        paths,
        fallback: false,
    };
};

export async function getStaticProps({ locale, params }: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
    const slug = (params!.slug as string[]).join('/');

    const content = await import(`../../../data/posts/${slug}.md`);
    const data = matter(content.default);

    return {
        props: {
            meta: data.data as PostMeta,
            contentHtml: new MarkdownIt({
                html: true,
            }).render(data.content),
        },
    };
}

export default Page;
