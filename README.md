# ShadersBookForCocosCreator
The Book of Shaders For CocosCreator 2.1.2
## 前言
本项目是使用Cocos Creator实现的《The Book of Shaders》中的大部分Shader示例。原文地址：https://thebookofshaders.com/
Cocos Creator版本：2.1.2

## GLSL基础知识
- gl_FragCoord 默认输入值。存储了活动线程正在处理的像素坐标
- gl_FragColor 片段着色器的默认输出值。
## GLSL常用公式
- step()
这是个插值函数，需要输入两个参数。第一个是极限或阈值，第二个是我们想要检测或通过的值。对任何小于阈值的值，返回 0.0，大于阈值，则返回 1.0。
- smoothstep() 当给定一个范围的上下限和一个数值，这个函数会在已有的范围内给出插值。前两个参数规定转换的开始和结束点，第三个是给出一个值用来插值。
- y = mod(x,0.5); // 返回 x 对 0.5 取模的值
- y = fract(x); // 仅仅返回数的小数部分
- y = ceil(x);  // 向正无穷取整
- y = floor(x); // 向负无穷取整
- y = sign(x);  // 提取 x 的正负号
- y = abs(x);   // 返回 x 的绝对值
- y = clamp(x,0.0,1.0); // 把 x 的值限制在 0.0 到 1.0
- y = min(0.0,x);   // 返回 x 和 0.0 中的较小值
- y = max(0.0,x);   // 返回 x 和 0.0 中的较大值 
- y = sin(x); // x为任意值，y的值为(-1,1)
- y = cos(x); // x为任意值，y的值为(-1,1)