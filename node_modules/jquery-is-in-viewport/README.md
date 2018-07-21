# jQueryIsInViewport

This plugin allows you to react when an element is in the viewport.
You need throw confetti when the user scroll and see an element?, so this plugin is for you!

## Install
```bash
npm install jquery-is-in-viewport --save
// or
yarn add jquery-is-in-viewport
// or 
bower install jquery-is-in-viewport
```

## Usage
```javascript
$('.block').isInViewport(function (status) {
  if (status === 'entered') {
    $(this).addClass('throw-confetti')
  }

  if (status === 'leaved') {
    $(this).removeClass('throw-confetti')
  }
})
```

## Options
Status can be '**entered**' or '**leaved**'.
