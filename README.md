# TICA - Totally irresponsible consultation autoreply

## Description

  Good questions deserve good answers; likewise, crap questions deserve crap answers. Medical specialists are busy people; wasting their time with poorly-written consults is a rather offensive thing to, at least in my opinion.
  Totally irresponsible consultation autoreply (TICA) is a rather crudely written userscript that aims to harness the power of LLMs to save specialists the wasted time and mental anguish that comes with having to reply to these crap consults (and doing so more eloquently than the terse "We will see the patient soon").
  This script was written more as a personal reflection than a serious coding effort, so please don't expect me to (very actively) work further on this project.

## Usage

  TICA is a userscript written in JavaScript just like any other. As such, the basic usage is much the same.
  
  1. Install a userscript manager for your browser, like [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
  2. From your userscript manager, install the script totally_irresponsible_consult_autoreply_YYYY-MM-DD.user.js. (The HTML file consults_poc.html contains a basic framework that is intended to showcase the script. This file is not strictly required for the userscript to run, but it does give you an idea of how it's supposed to work.)
  3. Edit the file in your userscript manager:
    1. The "@match" clause in the header needs to be edited from the file URL file:///*/* to match your target web domain (like https://* or something else).
    2. Also, the statements document.getElementById("consult") and document.getElementById("reply") should have the element ID names changed to those actually used.
  4. Start the userscript. Fill in the required info and start receiving generations!

## Known bugs and Caveats

  - Depending on your environment, you may neeed to disable CORS protection on your browser.
  - Currently there is no way for TICA to run multiple times on the same page. Theoretically this can be done with a Mutation Observer, but I'm too lazy to refactor this code.

## License

Coffeeware