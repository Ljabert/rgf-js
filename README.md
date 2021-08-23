# RGF image rendering for the web

## You want to render an RGF image on your webpage...
...but Firefox and Chromium don't support it? :(

Well, you are in luck! \
Just include `rgf.js` and optionally `rgf-autofix.js` into your webpage and be amazed by the stunning 128p 1bit graphics.

## How do I use this?

`rgf.js` adds a global `rgf`-Object with the method `loadRGF()`.

To use it, simply pass your IMG-Node to the method.

```js
rgf.loadRGF(myNode, 'blue', 'red');
//                  ^- optional foreground color
//                          ^- optional background color
```

If you don't want to manually set up each RGF, you can use the `rgf-autofix.js`. \
This will automatically render all current and dynamically added RGF-Files.

Setting the foreground and background is also possible using `rgf-autofix.js`, just provide `rgf-foreground-color` and/or `rgf-background-color` as attributes of your IMG-Node.

```html
<img
    src="myAwesomeImage.rgf"
    rgf-foreground-color="blue"
    rgf-background-color="#ff00fe"
>
```

## What are you talking about?

RGF-Files are the LEGO MINDSTORMS EV3 graphics files, used to display all kinds of things on the LCD.

The first two bytes of the file consist of the width and height, each an 8-bit unsigned integer. \
The LCD resolution is 178 by 128 pixels, which is why I limited this script to those values.
Each following bit represents a single pixel, 1 being black and 0 being white.

## WOW! I want to use that on Internet Explorer!
Well, thank god, I'm keeping compatibility with IE11.
