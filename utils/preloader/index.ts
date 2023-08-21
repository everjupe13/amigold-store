export class Preloader {
  static invoke(callback: () => void) {
    return new Promise<void>((_resolve, _reject) => {
      window.addEventListener('load', () => {
        document.querySelector('#loader')?.classList.add('before-load')
        setTimeout(async () => {
          callback()
          await this.loaded(document.querySelector('#loader'))
          await this.fadeOut(document.querySelector('#loader'))
          document.body.classList.remove('body-loading')
        }, 400)
      })
    })
  }

  private static fadeOut(element: HTMLElement | null) {
    if (!element) {
      return Promise.resolve()
    }

    return new Promise<void>((resolve, _reject) => {
      let op = 1
      const timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer)
          element.style.display = 'none'
          resolve()
        }

        element.style.opacity = String(op)
        element.style.filter = 'alpha(opacity=' + op * 100 + ')'
        op -= op * 0.1
      }, 10)
    })
  }

  private static loaded(element: HTMLElement | null) {
    if (!element) {
      return Promise.resolve()
    }

    return new Promise<void>((resolve, _reject) => {
      element.classList.add('erase')
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
}
