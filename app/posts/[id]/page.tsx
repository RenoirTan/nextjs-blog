import { getAllPostIds, getPostData } from '../../../lib/posts';
import Date from '../../../components/date';
import utilStyles from '../../../styles/utils.module.css';

export default async function Post({ params }) {
  const postData = await getPostData(params.id);
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