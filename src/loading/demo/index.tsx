import React from 'react';
import { Loading } from 'rokku';
import { components } from 'site-mobile-demo';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;

  return (
    <DemoSection>
      <DemoBlock title="加载类型">
        <Loading />
        <Loading type="spinner" />
      </DemoBlock>
      <DemoBlock title="自定义颜色">
        <Loading color="#1989fa" />
        <Loading type="spinner" color="#2879ff" />
      </DemoBlock>
      <DemoBlock title="自定义大小">
        <Loading size="24" />
        <Loading type="spinner" size="24" />
      </DemoBlock>
      <DemoBlock title="加载文案">
        <Loading size="24px">加载中...</Loading>
      </DemoBlock>
      <DemoBlock title="垂直排列">
        <Loading size="24px" vertical>
          加载中...
        </Loading>
      </DemoBlock>
    </DemoSection>
  );
};
