import { IPluginContext } from '@tarojs/service';
import { resolve } from 'path';
import { writeFile } from 'fs';

type ValueType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'unknown';

/**
 * 根据defineConstants合并成全局声明文件
 * @param config Taro配置项中defineConstants对象
 */
function generateDeclare(config: Record<string, any>) {
  const keys = Object.keys(config);

  return keys.reduce((previousValue, currentKey) => {
    let valueType: ValueType = typeof config[currentKey];

    // (预防掉坑的处理zzz)
    // 开发中经常会出现在defineConstants中未使用JSON.stringify() or '"xxx"'来定义字符串变量
    // 通过JSON.parse来进行二次校验 如果未通过校验则置为「unknown」类型并提供一个warning给到开发者自行检查
    if (valueType === 'string') {
      try {
        valueType = typeof JSON.parse(config[currentKey]);
      } catch (err) {
        valueType = 'unknown';

        // @ts-ignore
        if (err.toString().includes('SyntaxError')) {
          console.warn(
            '\x1b[33m%s',
            `\n(!!!)Taro-plugin-auto-declare-define-constants: \nConfig: defineConstants中有一个未识别成字符串：「${currentKey}」（如果就是要变量/表达式请忽略）\n`,
          );
        } else {
          console.error('\x1b[91m', `\n(!!!)Taro-plugin-auto-declare-define-constants: \n插件异常：${err}\n`);
        }
      }
    }
    return previousValue + `declare const ${currentKey}: ${valueType};\n`;
  }, '');
}

export default (ctx: IPluginContext, _: any) => {
  // plugin 主体
  ctx.onBuildStart(() => {
    if (process.env.NODE_ENV === 'production') return;
    console.log('Loading ⏳ : generate config global declare...');
    const constants = ctx.initialConfig.defineConstants;
    if (!constants) return;
    writeFile(
      resolve('./defineConstants.d.ts'),
      generateDeclare(constants),
      {
        flag: 'w', // a：追加写入；w：覆盖写入
      },
      (err) => {
        if (err) {
          console.error(`\nError ❌ : ${err}`);
        } else {
          console.log('\nSuccessful ✅ : generate config global declare');
        }
      },
    );
  });
};
