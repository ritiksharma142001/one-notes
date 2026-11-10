import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function EditorPage() {
  return (
    <Layout title="Write notes" description="Write, edit and publish One Notes pages to GitHub." noFooter>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <BrowserOnly fallback={<div style={{ padding: '3rem', textAlign: 'center' }}>Loading the editor…</div>}>
        {() => {
          const Editor = require('../notes-editor/Editor').default;
          return <Editor />;
        }}
      </BrowserOnly>
    </Layout>
  );
}
