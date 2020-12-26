import React from 'react';
import icons from '@rokku/icons';
import { Icon, Tabs, Flex } from 'rokku';
import { components } from 'site-mobile-demo';

import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;

  return (
    <DemoSection>
      <Tabs active={0} sticky>
        <Tabs.TabPane title="用法示例">
          <DemoBlock title="基础用法">
            <Flex>
              <Flex.Item span={6}>
                <Icon name="chat-o" />
              </Flex.Item>
              <Flex.Item span={6}>
                <Icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
              </Flex.Item>
            </Flex>
          </DemoBlock>
          <DemoBlock title="图标颜色">
            <Flex>
              <Flex.Item span={6}>
                <Icon name="chat-o" color="#1989fa" />
              </Flex.Item>
              <Flex.Item span={6}>
                <Icon name="fire-o" color="red" />
              </Flex.Item>
            </Flex>
          </DemoBlock>
          <DemoBlock title="图标大小">
            <Flex>
              <Flex.Item span={6}>
                <Icon name="chat-o" size="40" />
              </Flex.Item>
              <Flex.Item span={6}>
                <Icon name="chat-o" size="3rem" />
              </Flex.Item>
            </Flex>
          </DemoBlock>
        </Tabs.TabPane>
        <Tabs.TabPane title="基础图标">
          <Flex wrap="wrap">
            {icons.basic.map((icon) => (
              <Flex.Item key={icon} span={6}>
                <Icon name={icon} />
                <span>{icon}</span>
              </Flex.Item>
            ))}
          </Flex>
        </Tabs.TabPane>
        <Tabs.TabPane title="线框图标">
          <Flex wrap="wrap">
            {icons.outline.map((icon) => (
              <Flex.Item key={icon} span={6}>
                <Icon name={icon} />
                <span>{icon}</span>
              </Flex.Item>
            ))}
          </Flex>
        </Tabs.TabPane>
        <Tabs.TabPane title="实底图标">
          <Flex wrap="wrap">
            {icons.filled.map((icon) => (
              <Flex.Item key={icon} span={6}>
                <Icon name={icon} />
                <span>{icon}</span>
              </Flex.Item>
            ))}
          </Flex>
        </Tabs.TabPane>
      </Tabs>
    </DemoSection>
  );
};
