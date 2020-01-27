import {Component, OnInit} from '@angular/core';
// Comment out to fix the problem
import * as XRegExp from "xregexp";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular9-core-js-xregexp';

  // Comment out to fix problem
  ngOnInit() {
    this.title = humanizeString(this.title);
  }
}

// Comment out everything below to fix problem
export function humanizeString(str: string) {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }

  str = decamelize(str);
  str = str
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
  str = str.charAt(0).toUpperCase() + str.slice(1);

  return str;
}

export function decamelize(text: string, separator: string = "_") {
  if (!(typeof text === "string" && typeof separator === "string")) {
    throw new TypeError(
      "The `text` and `separator` arguments should be of type `string`"
    );
  }

  const regex1 = XRegExp("([\\p{Ll}\\d])(\\p{Lu})", "g");
  const regex2 = XRegExp("(\\p{Lu}+)(\\p{Lu}[\\p{Ll}\\d]+)", "g");


  return (
    text
      // TODO: Use this instead of `xregexp` when targeting Node.js 10:
      // .replace(
      //     /([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu,
      //     `$1${separator}$2`
      // )
      // .replace(
      //     /(\p{Lowercase_Letter}+)(\p{Uppercase_Letter}[\p{Lowercase_Letter}\d]+)/gu,
      //     `$1${separator}$2`
      // )
      .replace(regex1, `$1${separator}$2`)
      .replace(regex2, `$1${separator}$2`)
      .toLowerCase()
  );
}
