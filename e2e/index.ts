import { ReactElement } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function mount(jsx: ReactElement) {
  await page.goto('http://localhost:9000');
  const testName = expect.getState().currentTestName;
  await page.evaluate(({ testName }) => {
    window['testHandle'].mount(testName);
  }, { testName });
}

export async function screenshot(jsx: ReactElement) {
  await mount(jsx);
  const wrapper = await page.$('#mount');
  const { width, height } = await wrapper.boundingBox();
  return page.screenshot({ fullPage: true, clip: { x: 0, y: 0, width, height } });
}
