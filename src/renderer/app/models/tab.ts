import { observable } from 'mobx';
import store from '../store';
import { TABS_PADDING } from '~/constants';
import { ipcRenderer } from 'electron';
import React from 'react';

let id = 0;

export class Tab {
  @observable
  public id: number = id++;

  @observable
  public isDragging: boolean = false;

  @observable
  public title: string = 'New tab';

  @observable
  public loading: boolean = false;

  @observable
  public favicon: string = '';

  @observable
  public hovered: boolean = false;

  @observable
  public isBookmarked: boolean = false;

  public url: string = '';
  public width: number = 0;
  public left: number = 0;
  public isClosing: boolean = false;

  public ref = React.createRef<HTMLDivElement>();

  public select() {
    if (!this.isClosing) {
      store.tabsStore.selectedTab = this.id;
      ipcRenderer.send('select-tab', this.id);
    }
  }

  public getWidth() {
    const tabs = store.tabsStore.tabs.filter(x => !x.isClosing);
    const width =
      store.tabsStore.getContainerWidth() / tabs.length - TABS_PADDING;

    if (width > 200 - TABS_PADDING) {
      return 200 - TABS_PADDING;
    }
    if (width < 72 - TABS_PADDING) {
      return 72 - TABS_PADDING;
    }

    return width;
  }

  public getLeft() {
    const { tabs } = store.tabsStore;
    const index = tabs.indexOf(this);

    let left = 0;
    for (let i = 0; i < index; i++) {
      left += tabs[i].width + TABS_PADDING;
    }

    return left;
  }

  public getNewLeft() {
    const index = store.tabsStore.tabs.indexOf(this);

    let left = 0;
    for (let i = 0; i < index; i++) {
      left += this.getWidth() + TABS_PADDING;
    }

    return left;
  }

  public setLeft(left: number, animation: boolean) {
    store.tabsStore.animateProperty('x', this.ref.current, left, animation);
    this.left = left;
  }

  public setWidth(width: number, animation: boolean) {
    store.tabsStore.animateProperty(
      'width',
      this.ref.current,
      width,
      animation,
    );
    this.width = width;
  }
}