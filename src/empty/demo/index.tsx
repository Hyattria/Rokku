import React from 'react';
import { Empty } from 'rokku';
import { components } from 'site-mobile-demo';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  return (
    <DemoSection>
      <DemoBlock title="基本用法">
        <Empty
          image="http://www.rokku.icu/image/empty.png"
          description="描述文字"
          className="custom-empty"
        />
      </DemoBlock>
    </DemoSection>
  );
};
