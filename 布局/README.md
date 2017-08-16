CSS基本的布局实现
* 单列布局
* 三列布局
  menu和aside区域分别左右浮动，数据顺序上不是通常的menu-main-aside,而是把main放在最后；menu、aside分别设置宽度，main数值不需要设置宽度，margin-left/right值让其居中
* 圣杯布局
  main放置在menu、aside前，并设置width：100%，三者都左浮动，menu、aside分别margin-left为-自身width，并且left/rigth:-自身width。缺点：容器宽度过小的时后，三者不排列在一个水平
* 双飞翼布局
  保持main在前的优点，改良圣杯布局容器过小时不在一个水平的问题。方法是在main内部在加入一个div.content，设置margin-left/right:为menu、asiede的width。

