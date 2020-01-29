## 简介
本项目是使用Cocos Creator实现的《The Book of Shaders》中的大部分Shader示例。原文地址：https://thebookofshaders.com/

Cocos Creator版本：2.1.2

代码地址：git@github.com:foupwang/ShadersBookForCocosCreator.git

部分Shader的展示效果如下：
![](https://github.com/foupwang/ShadersBookForCocosCreator/blob/master/20200129234725.jpg)

## GLSL内置函数
#### vec4 texture2D(sampler2D sampler, vec2 coord)
使用纹理坐标 coord，从当前绑定到 sampler 的二维纹理中读取相应的纹素。
#### radians(x)
将角度转化为弧度值，即 PI*x/180。
#### degrees(x)
将弧度值转化为角度，即 180*x/PI。
#### sin(x)
三角正弦函数，返回值区间为 [-1,1]。
#### cos(x)
三角余弦函数，返回值区间为 [-1,1]。
#### pow(x, n)
返回 x 的 n 次幂。
#### abs(x)
返回 x 的无符号绝对值。
#### sign(x)
如果 x>0 返回1.0，如果 x=0 返回0.0，否则返回 -1.0。
#### ceil(x)
对 x 向上取整。
#### floor(x)
对 x 向下取整。
#### mod(x, n)
取模，即 x 除以 n 的余数。
#### min(x1, x2)
返回 x1 和 x2 的较小值。
#### max(x1, x2)
返回 x1 和 x2 的较大值。
#### fract(x)
返回 x 的小数部分。
#### clamp(x, minVal, maxVal)
把 x 的值限制在 minVal 和 maxVal 之间，即返回 min(max(x,minVal),maxVal)。
#### mix(x, y, a)
返回 x 和 y 的线性混合，即 x*(1-a)+y*a
#### step(edge, x)
插值，根据两个数值生成阶梯函数，即 x<edge 则返回 0.0，否则返回 1.0。
#### smoothstep(edge0, edge1, x)
插值，经过Hermite插值的阶梯函数。如果 x<=edge0 则返回 0.0，如果 x>=edge1 则返回 1.0，否则按照如下方法插值并返回
```
// genType is float/vec2/vec3/vec4
genType t;
t = clamp((x-edge0)/(edge1-edge0), 0, 1);
return t*t*(3-2*t);
```
#### length(x)
返回矢量x的长度
#### distance(p0, p1)
返回 p0 和 p1 之间的距离，即 length(p0-p1)
#### dot(x, y)
返回 x 和 y 的点积，对于 vec2 就是 x[0]*y[0]+x[1]*y[1]
#### cross(x, y)
返回 x 和 y 的叉积，对于 vec3 就是
```
result[0] = x[1]*y[2] - y[1]*x[2]
result[1] = x[2]*y[0] - y[2]*x[0]
result[2] = x[0]*y[1] - y[0]*x[1]
```
#### normalize(x)
对 x 进行归一化，保持矢量方向不变但长度为 1，即 x/length(x)