import React from 'react';
import GoBack from 'components/GoBack';
import Layout from 'components/Layout';
import WebView from 'react-native-webview';


const PieceWeb = ({ navigation, route }: any) => {
  return (
    <Layout bottomTab>
      <GoBack
        navigation={navigation}
      />
      <WebView
        source={{ uri: route.params.link }}
      />
    </Layout>
  );
};

export default PieceWeb;
