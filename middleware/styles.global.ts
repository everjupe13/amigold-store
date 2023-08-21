export default defineNuxtRouteMiddleware((_to, _from) => {
  if (process.server) {
    return
  }

  const _body = document.querySelector('body') as HTMLElement
  const _footer = document.querySelector('#footer') as HTMLElement
  const _header = document.querySelector('#header') as HTMLElement

  // if (to.path !== '/') {
  //   _body?.classList.add('bg-pale')
  //   _footer?.classList.add('!my-0')
  //   _header?.classList.add('expanded')
  // } else {
  //   _body?.classList.remove('bg-pale')
  //   _footer?.classList.remove('!my-0')
  //   _header?.classList.remove('expanded')
  // }
})
