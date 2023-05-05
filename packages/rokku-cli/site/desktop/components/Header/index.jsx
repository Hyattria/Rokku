import React, { useState, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import SearchInput from '../SearchInput';
import './index.less';

const Header = (props) => {
  const versionRef = useRef(null);
  const { lang, config, versions, langConfigs } = props;
  const { pathname } = useLocation();
  const [showVersionPop, setShowVersionPop] = useState(false);

  const checkHideVersionPop = (event) => {
    if (!versionRef.current.contains(event.target)) {
      setShowVersionPop(false);
    }
  };

  const anotherLang = useMemo(() => {
    const items = langConfigs.filter((item) => item.lang !== lang);
    if (items.length) {
      return items[0];
    }
    return {};
  }, [pathname]);

  const langLink = useMemo(() => {
    return `#${pathname.replace(lang, anotherLang.lang)}`;
  }, [pathname]);

  const langLabel = useMemo(() => {
    return anotherLang.label;
  }, [pathname]);

  const toggleVersionPop = () => {
    // @ts-ignore
    const val = !this.showVersionPop;
    const action = val ? 'add' : 'remove';
    document.body[`${action}EventListener`]('click', checkHideVersionPop);
    setShowVersionPop(val);
  };

  const onSwitchVersion = (version) => {
    if (version.link) {
      window.location.href = version.link;
    }
  };

  return (
    <div className="rokku-doc-header">
      <div className="rokku-doc-row">
        <div className="rokku-doc-header__top">
          <a className="rokku-doc-header__logo">
            <img src={config.logo} alt="" />
            <span>{config.title}</span>
          </a>
          {config.searchConfig && (
            <SearchInput lang={lang} searchConfig={config.searchConfig} />
          )}
          <ul className="rokku-doc-header__top-nav">
            {config.links &&
              config.links.length &&
              config.links.map((item) => (
                <li key={item.url} className="rokku-doc-header__top-nav-item">
                  <a
                    className="rokku-doc-header__logo-link"
                    target="_blank"
                    href={item.url}
                  >
                    <img src={item.logo} />
                  </a>
                </li>
              ))}
            {versions && (
              <li ref={versionRef} className="rokku-doc-header__top-nav-item">
                <span
                  className={classnames(
                    'rokku-doc-header__cube rokku-doc-header__version',
                    {
                      'rokku-doc-header__version-multiple': versions.length > 1,
                    }
                  )}
                  onClick={toggleVersionPop}
                >
                  v{versions[0].label}
                  {/* <transition name="rokku-doc-dropdown">
                    {showVersionPop && (
                      <div className="rokku-doc-header__version-pop">
                        {versions.map((item) => (
                          <div
                            key={item}
                            className="rokku-doc-header__version-pop-item"
                            onClick={() => onSwitchVersion(item)}
                          >
                            {item.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </transition> */}
                </span>
              </li>
            )}
            {langLabel && langLink && (
              <li className="rokku-doc-header__top-nav-item">
                <a className="rokku-doc-header__cube" href={langLink}>
                  {langLabel}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
