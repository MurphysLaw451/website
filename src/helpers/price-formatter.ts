var A = (() => {
  return ((ke = A || (A = {})).FULL = 'full'), (ke.EXPANDED = 'expanded'), A
  var ke
})()
const fe = 8,
  be = 'en-US',
  j = new Intl.NumberFormat(be),
  ae = [
    '\u2080',
    '\u2081',
    '\u2082',
    '\u2083',
    '\u2084',
    '\u2085',
    '\u2086',
    '\u2087',
    '\u2088',
    '\u2089',
  ],
  Oe = [
    {
      number: 1e9,
      suffix: 'B',
    },
    {
      number: 1e6,
      suffix: 'M',
    },
    {
      number: 1e3,
      suffix: 'K',
    },
  ]
export class numberFormatter {
  static _commonNumberFormatters = {}
  static _getNumberFormatter(m) {
    return (
      numberFormatter._commonNumberFormatters[m] ??
      new Intl.NumberFormat(be, {
        minimumFractionDigits: m + 1,
      })
    )
  }
  static generateRandomInt(m) {
    return Math.trunc(Math.random() * (m + 1))
  }
  static toFixed(m) {
    let _ = m.toString()
    if (Math.abs(m) < 1) {
      const M = Number.parseInt(m.toString().split('e-')[1], 10)
      M &&
        ((m *= Math.pow(10, M - 1)),
        (_ =
          '0.' +
          Array.from({
            length: M,
          }).join('0') +
          m.toString().slice(2)))
    } else {
      let M = Number.parseInt(m.toString().split('+')[1], 10)
      M > 20 &&
        ((M -= 20),
        (_ =
          (m /= Math.pow(10, M)) +
          Array.from({
            length: M + 1,
          }).join('0')))
    }
    return _
  }
  static tokensNumberFormat(m, _) {
    return m.length <= _ ? 0.01 : +[m.slice(0, -_), '.', m.slice(_)].join('')
  }
  static getOptimalDecimals(m) {
    const _ = ((Math.floor(m) || '') + '').length
    let M = _ ? fe - _ : -Math.floor(Math.log(m) / Math.log(10) + 1)
    return (
      (M = _ ? M : M ? Math.max(M + 2 + 1, fe) : fe),
      Math.max(0, Math.min(M, 14))
    )
  }
  static shortPrice(m, _ = 10) {
    if (null == m) return ''
    const M = numberFormatter.toReadableNumber(m, null, _)
    return M && M.includes('...') ? M.slice(0, _ + 2) : M ? M.slice(0, _) : ''
  }
  static shortenPrice(m, _ = 4) {
    if (null == m) return ''
    if (m >= 1) return numberFormatter.toReadableNumber(m)
    {
      const M = numberFormatter.formatNumbersWithLargeDecimals(m, _)
      return void 0 === M ? '' : M
    }
  }
  static formatNumbersWithLargeDecimals(m, _, M?) {
    if (0 === m) return '0'
    {
      const Z = numberFormatter.toReadableNumber(m, A.FULL)
      let re = Z ? Number.parseInt(Z.split('.')[1]) : ''
      re = Number.parseInt(re.toString())
      const Me = -Math.floor(Math.log(m) / Math.log(10) + 1),
        Te = _ || 2
      return '0' === Z
        ? '0'
        : Me > Te
        ? '0.0' +
          numberFormatter.getUnicodeValue(`${Me}`) +
          String(re).slice(0, M ?? 4)
        : numberFormatter.formatNumber(m, _ && Me <= Te ? M ?? Me + 4 : M ?? 4)
    }
  }
  static formatNumber(m, _?) {
    let U = (_ ? numberFormatter._getNumberFormatter(_) : j).format(m)
    return _ && (U = U.slice(0, Math.max(0, U.length - 1))), U
  }
  static getUnicodeValue(m, _?) {
    if (+m > 9) {
      let M = m.charAt(0)
      return (
        (M = ae[+M]), numberFormatter.getUnicodeValue(m.slice(1, m.length), M)
      )
    }
    return _ ? (_ += ae[+m]) : ae[+m]
  }
  static toReadableNumber(m, _ = null, M = 2, U = 30) {
    if (
      null == m ||
      (void 0 === m.length && Number.isNaN(m)) ||
      '' === (m + '').trim()
    )
      return ''
    const Z = Math.floor(+m),
      re = (Z || '').toString().length
    return _ === A.FULL
      ? numberFormatter._displayFull(+m, Z, re)
      : numberFormatter._displayableNumber(+m, Z, re, _ === A.EXPANDED, M, U)
  }
  static roundBigNumber(m = '') {
    const _ = 'number' == typeof m ? m : Number(m.replace(/,/g, '')),
      M = Oe.find((U) => m >= U.number.toString())
    if (M) {
      let Z = (_ / M.number).toFixed(3)
      return (Z = Z.slice(0, Math.max(0, Z.length - 1))), `${Z}${M.suffix}`
    }
    return `${_}`
  }
  static roundPrice(m = '', _ = 2) {
    let M = 'number' == typeof m ? m : Number(m.replace(/,/g, ''))
    return (M = numberFormatter.transformNumber(M, _)), `${M}`
  }
  static _displayableNumber(m, _, M, U, Z = 2, re = 30, Me = be) {
    if (M) {
      if (_.toString().split('e')[1]) return m.toLocaleString(Me)
      {
        const Te = Math.max(0, 6 - M)
        return (+m.toFixed(Te)).toLocaleString(Me, {
          minimumFractionDigits: Te < Z ? Te : Z,
          maximumFractionDigits: Te,
        })
      }
    }
    {
      const Te =
          0 === m ? 0 : M ? 6 - M : -Math.floor(Math.log(m) / Math.log(10) + 1),
        Be = Math.min(Math.max(Te + Z + 2, 6), 20),
        Ye = (+m.toFixed(Math.max(0, Math.min(Be, re)))).toLocaleString(Me, {
          minimumFractionDigits: Z,
          maximumFractionDigits: Be,
        })
      return Te < 4 || U
        ? Ye
        : Ye.slice(0, 3) + '...' + Ye.slice(-Ye.length + Te)
    }
  }
  static _displayFull(m, _, M, U = be) {
    return M && _.toString().split('e')[1]
      ? numberFormatter.toFixed(m)
      : m.toLocaleString(U, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 20,
        })
  }
  static transformNumber(m, _, M?) {
    let U
    switch (!0) {
      case m > 1e5:
        U = numberFormatter.formatNumber(Math.trunc(m))
        break
      case m > 100 && m < 1e5:
        U = numberFormatter.formatNumber(m, M ?? 2)
        break
      case m > 1 && m < 100:
        U = numberFormatter.formatNumber(m, M ?? 4)
        break
      case m < 1:
        U = numberFormatter.formatNumbersWithLargeDecimals(m, _, M)
        break
      default:
        U = numberFormatter.formatNumber(Math.trunc(m))
    }
    return U
  }
}
numberFormatter._commonNumberFormatters = {
  2: new Intl.NumberFormat(be, {
    minimumFractionDigits: 3,
  }),
  4: new Intl.NumberFormat(be, {
    minimumFractionDigits: 5,
  }),
  5: new Intl.NumberFormat(be, {
    minimumFractionDigits: 6,
  }),
  6: new Intl.NumberFormat(be, {
    minimumFractionDigits: 7,
  }),
  7: new Intl.NumberFormat(be, {
    minimumFractionDigits: 8,
  }),
  8: new Intl.NumberFormat(be, {
    minimumFractionDigits: 9,
  }),
  10: new Intl.NumberFormat(be, {
    minimumFractionDigits: 11,
  }),
}
