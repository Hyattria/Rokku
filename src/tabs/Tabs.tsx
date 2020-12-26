import React, { useState, useMemo, useRef, useEffect } from 'react';
import classnames from 'classnames';

import useRefs from '../hooks/use-refs';
import useScrollParent from '../hooks/use-scroll-parent';
import useWindowSize from '../hooks/use-window-size';

import TabsTitle from './TabsTitle';
import TabsContent from './TabsContent';
import TabsContext from './TabsContext';

import { TabPaneProps, TabsProps, TabStatic } from './PropsType';
import {
  addUnit,
  createNamespace,
  parseChildList,
  isHidden,
  isDef,
  unitToPx,
  scrollLeftTo,
} from '../utils';
import { callInterceptor } from '../utils/interceptor';
import { BORDER_TOP_BOTTOM } from '../utils/constant';

const [bem] = createNamespace('tabs');

const Tabs: React.FC<TabsProps> & TabStatic = (props) => {
  const { children, color, background } = props;

  const root = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const scroller = useScrollParent(root);
  const windowSize = useWindowSize();

  const [titleRefs, setTitleRefs] = useRefs();

  const [state, setState] = useState({
    inited: false,
    position: '',
    currentIndex: 0,
    lineStyle: {
      backgroundColor: props.color,
    },
  });

  const getTabName = (tab: TabPaneProps, index: number): string | number => tab?.name ?? index;
  const currentName = useMemo(() => {
    const activeTab = children[state.currentIndex];
    if (activeTab) {
      return getTabName(activeTab.props, state.currentIndex);
    }
    return '';
  }, [state.currentIndex]);

  const offsetTopPx = useMemo(() => unitToPx(props.offsetTop), [props.offsetTop]);
  // const scrollOffset = useMemo(() => {
  //   if (props.sticky) {
  //     return offsetTopPx + tabHeight;
  //   }
  //   return 0;
  // }, []);

  // whether the nav is scrollable
  const scrollable = useMemo(
    () => React.Children.count(props.children) > props.swipeThreshold || !props.ellipsis,
    [],
  );

  const navStyle = useMemo(
    () => ({
      borderColor: color,
      background,
    }),
    [color, background],
  );

  const findAvailableTab = (index: number) => {
    const diff = index < state.currentIndex ? -1 : 1;

    while (index >= 0 && index < React.Children.count(children)) {
      if (!children[index].disabled) {
        return index;
      }
      index += diff;
    }
    return null;
  };

  const setCurrentIndex = (currentIndex: number) => {
    const newIndex = findAvailableTab(currentIndex);

    if (!isDef(newIndex)) {
      return;
    }

    const newTab = children[newIndex];
    const newName = getTabName(newTab, newIndex);
    const shouldEmitChange = state.currentIndex !== null;

    Object.assign(state, {
      currentIndex: newIndex,
    });

    setState({ ...state });

    if (newName !== props.active) {
      // emit('update:active', newName);

      if (shouldEmitChange) {
        // emit('change', newName, newTab.title);
      }
    }
  };

  // correct the index of active tab
  const setCurrentIndexByName = (name: string | number) => {
    const currentIndex = React.Children.toArray(children).findIndex(
      (tab: { props: TabPaneProps }, index) => getTabName(tab.props, index) === name,
    );

    setCurrentIndex(currentIndex);
  };

  // scroll active tab into view
  const scrollIntoView = (immediate?: boolean) => {
    const nav = navRef.current;
    if (!scrollable || !titleRefs || !titleRefs[state.currentIndex]) {
      return;
    }

    const title = titleRefs[state.currentIndex];

    const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;
    scrollLeftTo(nav, to, immediate ? 0 : +props.duration);
  };

  const init = () => {
    setCurrentIndexByName(props.active || currentName);
    Object.assign(state, {
      inited: true,
    });
    setState({ ...state });
    scrollIntoView(true);
    // setCurrentIndexByName(props.active || currentName.value);
    // nextTick(() => {
    //   state.inited = true;
    //   tabHeight = getVisibleHeight(wrapRef.value);
    //   scrollIntoView(true);
    // });
  };

  useEffect(() => {
    init();
  }, []);

  const setLine = () => {
    const shouldAnimate = state.inited;
    const titles = titleRefs;

    if (!titles || !titles[state.currentIndex] || props.type !== 'line' || isHidden(root.current)) {
      return;
    }

    const title = titles[state.currentIndex];
    const { lineWidth, lineHeight } = props;
    const left = title.offsetLeft + title.offsetWidth / 2;

    const lineStyle = {
      width: addUnit(lineWidth),
      backgroundColor: props.color,
      transform: `translateX(${left}px) translateX(-50%)`,
      transitionDuration: '',
      height: '',
      borderRadius: '',
    };

    if (shouldAnimate) {
      lineStyle.transitionDuration = `${props.duration}ms`;
    }

    if (isDef(lineHeight)) {
      const height = addUnit(lineHeight);
      lineStyle.height = height;
      lineStyle.borderRadius = height;
    }

    Object.assign(state, {
      lineStyle,
    });

    setState({ ...state });
  };

  useEffect(() => {
    setLine();
  }, [color, windowSize.width]);

  useEffect(() => {
    setLine();
    scrollIntoView();
  }, [state.currentIndex]);

  useEffect(() => {
    if (state.inited) {
      setCurrentIndexByName(props.active || currentName);
      setLine();
      scrollIntoView(true);
    }
  }, [React.Children.count(children)]);

  // useEffect(() => {
  //   if (state.inited) {
  //     setCurrentIndexByName(props.active || currentName.value);
  //     setLine();
  //     nextTick(() => {
  //       scrollIntoView(true);
  //     });
  //   }
  // }, [])

  // const scrollToCurrentContent = (immediate = false) => {
  //   if (props.scrollspy) {
  //     const target = titleRefs[state.currentIndex];

  //     if (target) {
  //       const to = getElementTop(target, scroller) - scrollOffset.value;

  //       lockScroll = true;
  //       scrollTopTo(scroller.value, to, immediate ? 0 : +props.duration, () => {
  //         lockScroll = false;
  //       });
  //     }
  //   }
  // };

  // emit event when clicked
  const onClick = (item: TabPaneProps, index: number) => {
    const { title, disabled } = item;
    const name = getTabName(item, index);

    if (disabled) {
      // emit('disabled', name, title);
    } else {
      callInterceptor({
        interceptor: props.beforeChange,
        args: [name],
        done: () => {
          setCurrentIndex(index);
          // scrollToCurrentContent();
        },
      });
      if (props.onClick) {
        props.onClick(name, title);
      }
    }
  };

  const renderNav = () => {
    const tabs = parseChildList(props.children);

    return tabs.map((item: TabPaneProps, index: number) => {
      return (
        <TabsTitle
          ref={setTitleRefs(index)}
          key={item.key}
          dot={item.dot}
          type={props.type}
          badge={item.badge}
          title={item.title}
          color={props.color}
          style={item.titleStyle}
          className={item.titleClass}
          isActive={index === state.currentIndex}
          disabled={item.disabled}
          scrollable={scrollable}
          renderTitle={item.renderTitle}
          activeColor={props.titleActiveColor}
          inactiveColor={props.titleInactiveColor}
          onClick={() => {
            onClick(item, index);
          }}
        />
      );
    });
  };

  const renderHeader = () => {
    const { type, border } = props;
    return (
      <div
        ref={wrapRef}
        className={classnames([
          bem('wrap', { scrollable }),
          { [BORDER_TOP_BOTTOM]: type === 'line' && border },
        ])}
      >
        <div
          ref={navRef}
          role="tablist"
          className={classnames(bem('nav', [type, { complete: scrollable }]))}
          style={navStyle}
        >
          {renderNav()}
          <div className={classnames(bem('line'))} style={state.lineStyle} />
        </div>
      </div>
    );
  };

  return (
    <TabsContext.Provider value={{ props, currentName }}>
      <div ref={root} className={classnames(bem([props.type]))}>
        {renderHeader()}
        <TabsContent
          count={React.Children.count(children)}
          inited={state.inited}
          animated={props.animated}
          duration={props.duration}
          swipeable={props.swipeable}
          lazyRender={props.lazyRender}
          currentIndex={state.currentIndex}
          // onChange={setCurrentIndex}
        >
          {React.Children.map(children, (node: React.ReactElement, index: number) =>
            React.cloneElement(node, {
              index,
            }),
          )}
        </TabsContent>
      </div>
    </TabsContext.Provider>
  );
};

Tabs.defaultProps = {
  type: 'line',
  duration: 300,
  offsetTop: 0,
};

export default Tabs;
