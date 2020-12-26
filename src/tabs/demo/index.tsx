import React from 'react';
import { Tabs, Toast } from 'rokku';
import { components } from 'site-mobile-demo';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;

  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <Tabs active={2}>
          {[1, 2, 3, 4].map((item) => (
            <Tabs.TabPane key={item} title={`标签${item}`}>
              内容 {item}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
      <DemoBlock title="通过名称匹配">
        <Tabs active="c">
          {['a', 'b', 'c'].map((item, index) => (
            <Tabs.TabPane key={item} title={`标签${index + 1}`} name={item}>
              内容 {index + 1}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
      <DemoBlock title="标签栏滚动">
        <Tabs>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Tabs.TabPane key={item} title={`标签${item}`}>
              内容 {item}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </DemoBlock>
      <DemoBlock title="禁用标签">
        <Tabs>
          <Tabs.TabPane title="标签1">内容1</Tabs.TabPane>
          <Tabs.TabPane title="标签2" disabled>
            内容2
          </Tabs.TabPane>
          <Tabs.TabPane title="标签3">内容3</Tabs.TabPane>
        </Tabs>
      </DemoBlock>
      <DemoBlock title="点击事件">
        <Tabs onClick={(name, title) => Toast(title)}>
          <Tabs.TabPane title="标签1">内容1</Tabs.TabPane>
          <Tabs.TabPane title="标签2">内容2</Tabs.TabPane>
        </Tabs>
      </DemoBlock>
    </DemoSection>
  );
};
