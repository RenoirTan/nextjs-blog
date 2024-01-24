import { getAllPostIds, getPostData } from '../../../lib/posts';
import Date from '../../../components/date';
import utilStyles from '../../../styles/utils.module.css';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
  try {
    var postData = await getPostData(params.id); // normally i'd disavow var
  } catch {
    notFound();
  }
  // we are explicitly trusting remark to not put xss stuff in our website
  return (
    <>
      <head>
        <title>{postData.title}</title>
      </head>
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