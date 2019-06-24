export default class CSSUnitTranslator {
  constructor(elementFontSize, elementFontFamily) {
    let canvas = document.createElement('canvas')
    canvas.style.width = '1in'
    canvas.style.top ='-100%'
    canvas.style.bottom = '-100%'

    document.body.appendChild(canvas)

    let { fontSize, fontFamily } = window.getComputedStyle(canvas)
    
    let context = canvas.getContext('2d')
    context.font = (elementFontSize || fontSize) + ' ' + (elementFontFamily || fontFamily)

    this._c = {
      fontSize: +(elementFontSize || fontSize).replace('px', ''),
      rootFontSize: +fontSize.replace('px', ''),
      dpi: canvas.offsetWidth,
      chPx: context.measureText('0').width,
      exPx: context.measureText('x').width,
      get vhPx() { return document.documentElement.clientHeight },
      get vwPx() { return document.documentElement.clientWidth },
      alphaRegex: new RegExp('[a-zA-Z%]', 'g')
    }

    document.body.removeChild(canvas)

    this.formulas = {
      'in-cm': v => v * 2.54,
      'in-mm': v => v * 25.4,
      'in-pt': v => v * 72,
      'in-pc': v => v * 6,
      'in-px': v => v * this._c.dpi,
      'in-em': v => v * this._c.dpi / this._c.fontSize,
      'in-rem': v => v * this._c.dpi / this._c.rootFontSize,
      'in-ch': v => v * this._c.dpi / this._c.chPx,
      'in-ex': v => v * this._c.dpi / this._c.exPx,
      'in-vh': v => v * this._c.dpi / this._c.vhPx,
      'in-vw': v => v * this._c.dpi / this._c.vwPx,
      'in-vmin': v => v * this._c.dpi / Math.min(this._c.vhPx, this._c.vwPx),
      'in-vmax': v => v * this._c.dpi / Math.max(this._c.vhPx, this._c.vwPx),

      'cm-in': v => v * 1 / 2.54,
      'cm-mm': v => v * 10,
      'cm-pt': v => v * 72 / 2.54,
      'cm-pc': v => v * 6 / 2.54,
      'cm-px': v => v * this._c.dpi / 2.54,
      'cm-em': v => v * this._c.dpi / 2.54 / this._c.fontSize,
      'cm-rem': v => v * this._c.dpi / 2.54 / this._c.rootFontSize,
      'cm-ch': v => v * this._c.dpi / 2.54 / this._c.chPx,
      'cm-ex': v => v * this._c.dpi / 2.54 / this._c.exPx,
      'cm-vh': v => v * this._c.dpi / 2.54 / this._c.vhPx,
      'cm-vw': v => v * this._c.dpi / 2.54 / this._c.vwPx,
      'cm-vmin': v => v * this._c.dpi / 2.54 / Math.min(this._c.vhPx, this._c.vwPx),
      'cm-vmax': v => v * this._c.dpi / 2.54 / Math.max(this._c.vhPx, this._c.vwPx),

      'mm-in': v => v * 1 / 25.4,
      'mm-cm': v => v * 1 / 10,
      'mm-pt': v => v * 72 / 25.4,
      'mm-pc': v => v * 6 / 25.4,
      'mm-px': v => v * this._c.dpi / 25.4,
      'mm-em': v => v * this._c.dpi / 25.4 / this._c.fontSize,
      'mm-rem': v => v * this._c.dpi / 25.4 / this._c.rootFontSize,
      'mm-ch': v => v * this._c.dpi / 25.4 / this._c.chPx,
      'mm-ex': v => v * this._c.dpi / 25.4 / this._c.exPx,
      'mm-vh': v => v * this._c.dpi / 25.4 / this._c.vhPx,
      'mm-vw': v => v * this._c.dpi / 25.4 / this._c.vwPx,
      'mm-vmin': v => v * this._c.dpi / 25.4 / Math.min(this._c.vhPx, this._c.vwPx),
      'mm-vmax': v => v * this._c.dpi / 25.4 / Math.max(this._c.vhPx, this._c.vwPx),

      'pt-in': v => v * 1 / 72,
      'pt-cm': v => v * 2.54 / 72,
      'pt-mm': v => v * 25.4 / 72,
      'pt-pc': v => v * 1 / 12,
      'pt-px': v => v * this._c.dpi / 72,
      'pt-em': v => v * this._c.dpi / 72 / this._c.fontSize,
      'pt-rem': v => v * this._c.dpi / 72 / this._c.rootFontSize,
      'pt-ch': v => v * this._c.dpi / 72 / this._c.chPx,
      'pt-ex': v => v * this._c.dpi / 72 / this._c.exPx,
      'pt-vh': v => v * this._c.dpi / 72 / this._c.vhPx,
      'pt-vw': v => v * this._c.dpi / 72 / this._c.vwPx,
      'pt-vmin': v => v * this._c.dpi / 72 / Math.min(this._c.vhPx, this._c.vwPx),
      'pt-vmax': v => v * this._c.dpi / 72 / Math.max(this._c.vhPx, this._c.vwPx),

      'pc-in': v => v * 1 / 6,
      'pc-cm': v => v * 2.54 / 6,
      'pc-mm': v => v * 25.4 / 6,
      'pc-pt': v => v * 12,
      'pc-px': v => v * this._c.dpi / 6,
      'pc-em': v => v * this._c.dpi / 6 / this._c.fontSize,
      'pc-rem': v => v * this._c.dpi / 6 / this._c.rootFontSize,
      'pc-ch': v => v * this._c.dpi / 6 / this._c.chPx,
      'pc-ex': v => v * this._c.dpi / 6 / this._c.exPx,
      'pc-vh': v => v * this._c.dpi / 6 / this._c.vhPx,
      'pc-vw': v => v * this._c.dpi / 6 / this._c.vwPx,
      'pc-vmin': v => v * this._c.dpi / 6 / Math.min(this._c.vhPx, this._c.vwPx),
      'pc-vmax': v => v * this._c.dpi / 6 / Math.max(this._c.vhPx, this._c.vwPx),

      'px-in': v => v * 1 / this._c.dpi,
      'px-cm': v => v * 2.54 / this._c.dpi,
      'px-mm': v => v * 25.4 / this._c.dpi,
      'px-pt': v => v * 72 / this._c.dpi,
      'px-pc': v => v * 6 / this._c.dpi,
      'px-em': v => v * 1 / this._c.fontSize,
      'px-rem': v => v * 1 / this._c.rootFontSize,
      'px-ch': v => v * 1 / this._c.chPx,
      'px-ex': v => v * 1 / this._c.exPx,
      'px-vh': v => v * 1 / this._c.vhPx,
      'px-vw': v => v * 1 / this._c.vwPx,
      'px-vmin': v => v * 1 / Math.min(this._c.vhPx, this._c.vwPx),
      'px-vmax': v => v * 1 / Math.max(this._c.vhPx, this._c.vwPx),

      'em-in': v => v * this._c.fontSize / this._c.dpi,
      'em-cm': v => v * this._c.fontSize * 2.54 / this._c.dpi,
      'em-mm': v => v * this._c.fontSize * 25.4 / this._c.dpi,
      'em-pt': v => v * this._c.fontSize * 72 / this._c.dpi,
      'em-pc': v => v * this._c.fontSize * 6 / this._c.dpi,
      'em-px': v => v * this._c.fontSize,
      'em-rem': v => v * this._c.fontSize / this._c.rootFontSize,
      'em-ch': v => v * this._c.fontSize / this._c.chPx,
      'em-ex': v => v * this._c.fontSize / this._c.exPx,
      'em-vh': v => v * this._c.fontSize / this._c.vhPx,
      'em-vw': v => v * this._c.fontSize / this._c.vwPx,
      'em-vmin': v => v * this._c.fontSize / Math.min(this._c.vhPx, this._c.vwPx),
      'em-vmax': v => v * this._c.fontSize / Math.max(this._c.vhPx, this._c.vwPx),

      'rem-in': v => v * this._c.rootFontSize / this._c.dpi,
      'rem-cm': v => v * this._c.rootFontSize * 2.54 / this._c.dpi,
      'rem-mm': v => v * this._c.rootFontSize * 25.4 / this._c.dpi,
      'rem-pt': v => v * this._c.rootFontSize * 72 / this._c.dpi,
      'rem-pc': v => v * this._c.rootFontSize * 6 / this._c.dpi,
      'rem-px': v => v * this._c.rootFontSize,
      'rem-em': v => v * this._c.rootFontSize / this._c.fontSize,
      'rem-ch': v => v * this._c.rootFontSize / this._c.chPx,
      'rem-ex': v => v * this._c.rootFontSize / this._c.exPx,
      'rem-vh': v => v * this._c.rootFontSize / this._c.vhPx,
      'rem-vw': v => v * this._c.rootFontSize / this._c.vwPx,
      'rem-vmin': v => v * this._c.rootFontSize / Math.min(this._c.vhPx, this._c.vwPx),
      'rem-vmax': v => v * this._c.rootFontSize / Math.max(this._c.vhPx, this._c.vwPx),
      
      'ch-in': v => v * this._c.chPx / this._c.dpi,
      'ch-cm': v => v * this._c.chPx * 2.54 / this._c.dpi,
      'ch-mm': v => v * this._c.chPx * 25.4 / this.dpi,
      'ch-pt': v => v * this._c.chPx / this._c.dpi * 72,
      'ch-pc': v => v * this._c.chPx / this._c.dpi * 6,
      'ch-px': v => v * this._c.chPx,
      'ch-em': v => v * this._c.chPx / this._c.fontSize,
      'ch-rem': v => v * this._c.chPx / this._c.rootFontSize,
      'ch-ex': v => v * this._c.chPx / this._c.exPx,
      'ch-vh': v => v * this._c.chPx / this._c.vhPx,
      'ch-vw': v => v * this._c.chPx / this._c.vwPx,
      'ch-vmin': v => v * this._c.chPx / Math.min(this._c.vhPx, this._c.vwPx),
      'ch-vmax': v => v * this._c.chPx / Math.max(this._c.vhPx, this._c.vwPx),
      
      'ex-in': v => v * this._c.exPx / this._c.dpi,
      'ex-cm': v => v * this._c.exPx * 2.54 / this._c.dpi,
      'ex-mm': v => v * this._c.exPx * 25.4 / this.dpi,
      'ex-pt': v => v * this._c.exPx / this._c.dpi * 72,
      'ex-pc': v => v * this._c.exPx / this._c.dpi * 6,
      'ex-px': v => v * this._c.exPx,
      'ex-em': v => v * this._c.exPx / this._c.fontSize,
      'ex-rem': v => v * this._c.exPx / this._c.rootFontSize,
      'ex-ch': v => v * this._c.exPx / this._c.chPx,
      'ex-vh': v => v * this._c.exPx / this._c.vhPx,
      'ex-vw': v => v * this._c.exPx / this._c.vwPx,
      'ex-vmin': v => v * this._c.exPx / Math.min(this._c.vhPx, this._c.vwPx),
      'ex-vmax': v => v * this._c.exPx / Math.max(this._c.vhPx, this._c.vwPx),
      
      'vh-in': v => v * this._c.vhPx / this._c.dpi,
      'vh-cm': v => v * this._c.vhPx * 2.54 / this._c.dpi,
      'vh-mm': v => v * this._c.vhPx * 25.4 / this.dpi,
      'vh-pt': v => v * this._c.vhPx / this._c.dpi * 72,
      'vh-pc': v => v * this._c.vhPx / this._c.dpi * 6,
      'vh-px': v => v * this._c.vhPx,
      'vh-em': v => v * this._c.vhPx / this._c.fontSize,
      'vh-rem': v => v * this._c.vhPx / this._c.rootFontSize,
      'vh-ch': v => v * this._c.vhPx / this._c.chPx,
      'vh-ex': v => v * this._c.vhPx / this._c.exPx,
      'vh-vw': v => v * this._c.vhPx / this._c.vwPx,
      'vh-vmin': v => v * this._c.vhPx / Math.min(this._c.vhPx, this._c.vwPx),
      'vh-vmax': v => v * this._c.vhPx / Math.max(this._c.vhPx, this._c.vwPx),
      
      'vw-in': v => v * this._c.vwPx / this._c.dpi,
      'vw-cm': v => v * this._c.vwPx * 2.54 / this._c.dpi,
      'vw-mm': v => v * this._c.vwPx * 25.4 / this.dpi,
      'vw-pt': v => v * this._c.vwPx / this._c.dpi * 72,
      'vw-pc': v => v * this._c.vwPx / this._c.dpi * 6,
      'vw-px': v => v * this._c.vwPx,
      'vw-em': v => v * this._c.vwPx / this._c.fontSize,
      'vw-rem': v => v * this._c.vwPx / this._c.rootFontSize,
      'vw-ch': v => v * this._c.vwPx / this._c.chPx,
      'vw-ex': v => v * this._c.vwPx / this._c.exPx,
      'vw-vh': v => v * this._c.vwPx / this._c.vhPx,
      'vw-vmin': v => v * this._c.vwPx / Math.min(this._c.vhPx, this._c.vwPx),
      'vw-vmax': v => v * this._c.vwPx / Math.max(this._c.vhPx, this._c.vwPx),
      
      'vmin-in': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.dpi,
      'vmin-cm': v => v * Math.min(this._c.vhPx, this._c.vwPx) * 2.54 / this._c.dpi,
      'vmin-mm': v => v * Math.min(this._c.vhPx, this._c.vwPx) * 25.4 / this.dpi,
      'vmin-pt': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.dpi * 72,
      'vmin-pc': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.dpi * 6,
      'vmin-px': v => v * Math.min(this._c.vhPx, this._c.vwPx),
      'vmin-em': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.fontSize,
      'vmin-rem': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.rootFontSize,
      'vmin-ch': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.chPx,
      'vmin-ex': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.exPx,
      'vmin-vh': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.vhPx,
      'vmin-vw': v => v * Math.min(this._c.vhPx, this._c.vwPx) / this._c.vwPx,
      'vmin-vmax': v => v * Math.min(this._c.vhPx, this._c.vwPx) / Math.max(this._c.vhPx, this._c.vwPx),
      
      'vmax-in': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.dpi,
      'vmax-cm': v => v * Math.max(this._c.vhPx, this._c.vwPx) * 2.54 / this._c.dpi,
      'vmax-mm': v => v * Math.max(this._c.vhPx, this._c.vwPx) * 25.4 / this.dpi,
      'vmax-pt': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.dpi * 72,
      'vmax-pc': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.dpi * 6,
      'vmax-px': v => v * Math.max(this._c.vhPx, this._c.vwPx),
      'vmax-em': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.fontSize,
      'vmax-rem': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.rootFontSize,
      'vmax-ch': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.chPx,
      'vmax-ex': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.exPx,
      'vmax-vh': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.vhPx,
      'vmax-vw': v => v * Math.max(this._c.vhPx, this._c.vwPx) / this._c.vwPx,
      'vmax-vmin': v => v * Math.max(this._c.vhPx, this._c.vwPx) / Math.min(this._c.vhPx, this._c.vwPx),
    }
  }

  translate(value, to, decimals) {
    if (!isNaN(value))
      value += 'px'
    if (typeof value !== 'string' && !(value instanceof String))
      return undefined

    let idx = value.search(this._c.alphaRegex)
    if (idx < 1)
      return undefined

    let v = +value.slice(0, idx)
    let from = value.slice(idx)
    if (isNaN(v))
      return undefined
    if (from === to)
      return v + to

    const units = `${from}-${to}`
    if (!this.formulas[units])
      return undefined

    let result = this.formulas[units](v)
    if (isNaN(result))
      return result
    
    if (!isNaN(decimals))
      result = Math.round(result * 10 ** decimals) / 10 ** decimals
    
    return result + to
  }
}
