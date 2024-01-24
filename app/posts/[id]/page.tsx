import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import Date from '../../../components/date';
import utilStyles from '../../../styles/utils.module.css';
import Layout from '../../../components/layout';

export default async function Post({ params }) {
  const postData = await getPostData(params.id);
  // we are explicitly trusting remark to not put xss stuff in our website
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// app router stuff (page router equivalent to getStaticPaths)
export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}