import React from 'react';
import { Cell, Radio } from 'rokku';
import { components } from 'site-mobile-demo';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <div className="demo-radio-group">
          <Radio.Group initChecked="1">
            <Radio name="1">单选框1</Radio>
            <Radio name="2">单选框2</Radio>
          </Radio.Group>
        </div>
      </DemoBlock>
      <DemoBlock title="水平排列">
        <div className="demo-radio-group">
          <Radio.Group initChecked="1" direction="horizontal">
            <Radio name="1">单选框1</Radio>
            <Radio name="2">单选框2</Radio>
          </Radio.Group>
        </div>
      </DemoBlock>
      <DemoBlock title="禁用状态">
        <div className="demo-radio-group">
          <Radio.Group initChecked="1" disabled>
            <Radio name="1">单选框1</Radio>
            <Radio name="2">单选框2</Radio>
          </Radio.Group>
        </div>
      </DemoBlock>
      <DemoBlock title="自定义形状">
        <div className="demo-radio-group">
          <Radio.Group initChecked="1">
            <Radio name="1" shape="square">
              单选框1
            </Radio>
            <Radio name="2" shape="square">
              单选框2
            </Radio>
          </Radio.Group>
        </div>
      </DemoBlock>
      <DemoBlock title="自定义颜色">
        <div className="demo-radio-group">
          <Radio.Group initChecked="1">
            <Radio name="1" checkedColor="#ee0a24">
              单选框1
            </Radio>
            <Radio name="2" checkedColor="#ee0a24">
              单选框2
            </Radio>
          </Radio.Group>
        </div>
      </DemoBlock>
      <DemoBlock title="自定义大小">
        <div className="demo-radio-group">
          <Radio.Group initChecked="1">
            <Radio name="1" iconSize="24px">
              单选框1
            </Radio>
            <Radio name="2" iconSize="24px">
              单选框2
            </Radio>
          </Radio.Group>
        </div>
      </DemoBlock>
      <DemoBlock title="禁止文本点击">
        <div className="demo-radio-group">
          <Radio.Group initChecked="1">
            <Radio name="1" labelDisabled>
              单选框1
            </Radio>
            <Radio name="2" labelDisabled>
              单选框2
            </Radio>
          </Radio.Group>
        </div>
      </DemoBlock>
      <DemoBlock title="禁止文本点击">
        <Radio.Group initChecked="1">
          <Cell.Group>
            <Cell title="单选框1" icon="shop-o" rightIconSlot={() => <Radio name="1" />} />
            <Cell title="单选框2" icon="shop-o" rightIconSlot={() => <Radio name="2" />} />
          </Cell.Group>
        </Radio.Group>
      </DemoBlock>
      <DemoBlock title="单独使用">
        <div className="demo-radio-group">
          <Radio name="1" checked>
            单选框1
          </Radio>
          <Radio name="2" checked>
            单选框2
          </Radio>
        </div>
      </DemoBlock>
    </DemoSection>
  );
};
