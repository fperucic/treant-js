import $ from 'jquery';

export class UTIL {

    /**
     * Directly updates, recursively/deeply, the first object with all properties in the second object
     * @param {object} applyTo
     * @param {object} applyFrom
     * @return {object}
     */
    inheritAttrs( applyTo: any, applyFrom: any ) {
        for ( var attr in applyFrom ) {
            if ( applyFrom.hasOwnProperty( attr ) ) {
                if ( ( applyTo[attr] instanceof Object && applyFrom[attr] instanceof Object ) && ( typeof applyFrom[attr] !== 'function' ) ) {
                    this.inheritAttrs( applyTo[attr], applyFrom[attr] );
                }
                else {
                    applyTo[attr] = applyFrom[attr];
                }
            }
        }
        return applyTo;
    }

    /**
     * Returns a new object by merging the two supplied objects
     * @param {object} obj1
     * @param {object} obj2
     * @returns {object}
     */
    createMerge( obj1: any, obj2: any ) {
        var newObj = {};
        if ( obj1 ) {
            this.inheritAttrs( newObj, this.cloneObj( obj1 ) );
        }
        if ( obj2 ) {
            this.inheritAttrs( newObj, obj2 );
        }
        return newObj;
    }

    /**
     * Takes any number of arguments
     * @returns {*}
     */
    extend(...args: any) {
        if ( $ ) {
            Array.prototype.unshift.apply( args, [true, {}] );
            return $.extend.apply( $, args );
        }
        else {
            return this.createMerge.apply( this, args );
        }
    }

    /**
     * @param {object} obj
     * @returns {*}
     */
    cloneObj( obj: any ) {
        if ( Object( obj ) !== obj ) {
            return obj;
        }
        var res = new obj.constructor();
        for ( var key in obj ) {
            if ( obj.hasOwnProperty(key) ) {
                res[key] = this.cloneObj(obj[key]);
            }
        }
        return res;
    }

    /**
     * @param {Element} el
     * @param {string} eventType
     * @param {function} handler
     */
    addEvent( el: any, eventType: string, handler: any ) {
        if ( $ ) {
            $( el ).on( eventType+'.treant', handler );
        }
        else if ( el.addEventListener ) { // DOM Level 2 browsers
            el.addEventListener( eventType, handler, false );
        }
        else if ( el.attachEvent ) { // IE <= 8
            el.attachEvent( 'on' + eventType, handler );
        }
        else { // ancient browsers
            el['on' + eventType] = handler;
        }
    }

    /**
     * @param {string} selector
     * @param {boolean} raw
     * @param {Element} parentEl
     * @returns {Element|jQuery}
     */
    findEl( selector: string, raw: boolean, parentEl?: any ) {
        parentEl = parentEl || document;

        if ( $ ) {
            var $element = $( selector, parentEl );
            return ( raw? $element.get( 0 ): $element );
        }
        else {
            // todo: getElementsByName()
            // todo: getElementsByTagName()
            // todo: getElementsByTagNameNS()
            if ( selector.charAt( 0 ) === '#' ) {
                return parentEl.getElementById( selector.substring( 1 ) );
            }
            else if ( selector.charAt( 0 ) === '.' ) {
                var oElements = parentEl.getElementsByClassName( selector.substring( 1 ) );
                return ( oElements.length? oElements[0]: null );
            }

            throw new Error( 'Unknown container element' );
        }
    }

    getOuterHeight( element: any ) {
        var nRoundingCompensation = 1;
        if ( typeof element.getBoundingClientRect === 'function' ) {
            return element.getBoundingClientRect().height;
        }
        else if ( $ ) {
            return Math.ceil( $( element ).outerHeight() ) + nRoundingCompensation;
        }
        else {
            return Math.ceil(
                element.clientHeight
                + this.getStyle( element, 'border-top-width', true )
                + this.getStyle( element, 'border-bottom-width', true )
                + this.getStyle( element, 'padding-top', true )
                + this.getStyle( element, 'padding-bottom', true )
                + nRoundingCompensation
            );
        }
    }

    getOuterWidth( element: any ) {
        var nRoundingCompensation = 1;
        if ( typeof element.getBoundingClientRect === 'function' ) {
            return element.getBoundingClientRect().width;
        }
        else if ( $ ) {
            return Math.ceil( $( element ).outerWidth() ) + nRoundingCompensation;
        }
        else {
            return Math.ceil(
                element.clientWidth
                + this.getStyle( element, 'border-left-width', true )
                + this.getStyle( element, 'border-right-width', true )
                + this.getStyle( element, 'padding-left', true )
                + this.getStyle( element, 'padding-right', true )
                + nRoundingCompensation
            );
        }
    }

    getStyle( element: any, strCssRule: any, asInt: boolean ) {
        var strValue = "";
        if ( document.defaultView && document.defaultView.getComputedStyle ) {
            strValue = document.defaultView.getComputedStyle( element, '' ).getPropertyValue( strCssRule );
        }
        else if( element.currentStyle ) {
            strCssRule = strCssRule.replace(/\-(\w)/g,
                function (strMatch: any, p1: any){
                    return p1.toUpperCase();
                }
            );
            strValue = element.currentStyle[strCssRule];
        }
        //Number(elem.style.width.replace(/[^\d\.\-]/g, ''));
        return ( asInt? parseFloat( strValue ): strValue );
    }

    addClass( element: any, cssClass: string ) {
        if ( $ ) {
            $( element ).addClass( cssClass );
        }
        else {
            if ( !this.hasClass( element, cssClass ) ) {
                if ( element.classList ) {
                    element.classList.add( cssClass );
                }
                else {
                    element.className += " "+cssClass;
                }
            }
        }
    }

    hasClass(element: any, my_class: string) {
        return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" "+my_class+" ") > -1;
    }

    toggleClass ( element: any, cls: string, apply: boolean ) {
        if ( $ ) {
            $( element ).toggleClass( cls, apply );
        }
        else {
            if ( apply ) {
                //element.className += " "+cls;
                element.classList.add( cls );
            }
            else {
                element.classList.remove( cls );
            }
        }
    }

    setDimensions( element: any, width: number, height: number ) {
        if ( $ ) {
            $( element ).width( width ).height( height );
        }
        else {
            element.style.width = width+'px';
            element.style.height = height+'px';
        }
    }

    isjQueryAvailable() {return(typeof ($) !== 'undefined' && $);}
};