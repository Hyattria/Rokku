import React from 'react';
import { Toast, Swipe } from 'rokku';
import { components } from 'site-mobile-demo';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const images = [
    'https://img.yzcdn.cn/vant/apple-1.jpg',
    'https://img.yzcdn.cn/vant/apple-2.jpg',
    'https://img.yzcdn.cn/vant/apple-3.jpg',
    'https://img.yzcdn.cn/vant/apple-4.jpg',
  ];

  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <Swipe autoplay="3000">
          <Swipe.Item>1</Swipe.Item>
          <Swipe.Item>2</Swipe.Item>
          <Swipe.Item>3</Swipe.Item>
          <Swipe.Item>4</Swipe.Item>
        </Swipe>
      </DemoBlock>
      <DemoBlock title="图片懒加载">
        <Swipe autoplay="3000" lazyRender>
          {images.map((item) => (
            <Swipe.Item key={item}>
              <img src={item} alt="" />
            </Swipe.Item>
          ))}
        </Swipe>
      </DemoBlock>
      <DemoBlock title="监听 change 事件">
        <Swipe onChange={(index: number) => Toast(`当前 Swipe 索引：${index}`)}>
          <Swipe.Item>1</Swipe.Item>
          <Swipe.Item>2</Swipe.Item>
          <Swipe.Item>3</Swipe.Item>
          <Swipe.Item>4</Swipe.Item>
        </Swipe>
      </DemoBlock>
      <DemoBlock title="纵向滚动">
        <Swipe
          autoplay="3000"
          vertical
          style={{ height: '200px' }}
          className="demo-swipe--vertical"
        >
          <Swipe.Item>1</Swipe.Item>
          <Swipe.Item>2</Swipe.Item>
          <Swipe.Item>3</Swipe.Item>
          <Swipe.Item>4</Swipe.Item>
        </Swipe>
      </DemoBlock>
    </DemoSection>
  );
};
