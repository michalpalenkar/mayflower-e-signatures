import { minifyHTML } from './htmlMinifier'

export const doctypeWrapper = (html) => {
  const output = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="margin: 0;padding: 0;min-width: 100%!important;">
  ${html}
</body>
</html>
      `
  const minifiedOutput = minifyHTML(output)
  return minifiedOutput
}
