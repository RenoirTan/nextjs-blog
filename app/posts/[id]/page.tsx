import { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import Date from '../../../components/date';
import utilStyles from '../../../styles/utils.module.css';
import { notFound } from 'next/navigation';


const getCachedPostData = cache(async (id: string) => getPostData(id));


type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined }
};


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // this is so wasteful
  try {
    var postData = await getCachedPostData(params.id);
  } catch {
    notFound();
  }
  return {
    title: postData.title,
    description: "uh oh"
  }
}


export default async function Page({ params }) {
  try {
    var postData = await getCachedPostData(params.id); // normally i'd disavow var
  } catch {
    notFound();
  }
  // we are explicitly trusting remark to not put xss stuff in our website
  return (
    <>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}

// app router stuff (page router equivalent to getStaticPaths)
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}