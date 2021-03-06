import { Pipe, PipeTransform } from '@angular/core';
import { UniteMapperPipe } from './mapper.pipe';
import { Menu } from '../classes';

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
        name: 'uniteLinker'
    })
export class UniteLinkerPipe implements PipeTransform {

    constructor( private _menu: Menu, private _uniteMapper: UniteMapperPipe ){}

    transform(value, node): string {

        if (node) {
            const pages = this._menu.getMenus();
            for (let index = 0; index < pages.length; index++) {
                // Node id is menu id
                if (node.id == pages[index]['id']) {
                    let page        = pages[index];
                    let pagePath = page.menuUrl;
                    let pagePathArr = pagePath.split('/');
                    let nodePathParam = node['urlParams'];

                    pagePathArr.forEach((element, index) => {
                        if (element.indexOf(':') === 0 && nodePathParam.hasOwnProperty(element.replace(/^(:)/, '') )) {
                            pagePathArr[index] = this._uniteMapper.transform(value, nodePathParam[ element.replace(/^(:)/, '') ]);
                        }
                    });

                    return '/' + pagePathArr.join('/');
                }
            }
        }
    }
  }
