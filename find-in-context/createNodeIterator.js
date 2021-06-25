/*

FROM: https://github.com/tilgovi/dom-node-iterator

Copyright (c) 2015 Randall Leeds

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/


document.createNodeIterator = (function() {

const create = Object.create.bind(Object)
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor.bind(Object)
const getPrototypeOf = Object.getPrototypeOf.bind(Object)
const original = Document?.prototype?.createNodeIterator
const originalBound = original && Function.prototype.call.bind(original)


function createNodeIterator(root, whatToShow = 0xFFFFFFFF, filter = null) {
  const document = this

  if (typeof originalBound === 'function') {
    const iter = originalBound(document, root, whatToShow, filter, false)
    const prototype = getPrototypeOf(iter)
    const referenceNode = getOwnPropertyDescriptor(prototype, 'referenceNode')
    return referenceNode === undefined ? wrapNodeIterator(iter) : iter
  }

  return implementNodeIterator(root, whatToShow, filter)
}


function successor(node, root) {
  if (node.firstChild)
    return node.firstChild

  while (node !== root) {
    if (node.nextSibling)
      return node.nextSibling

    node = node.parentNode
  }

  return null
}


function predecessor(node, root) {
  if (node === root)
    return null

  if (node.previousSibling) {
    node = node.previousSibling

    while (node.lastChild)
      node = node.lastChild

    return node
  }

  return node.parentNode
}


function implementNodeIterator(root, whatToShow, filter) {
  const data = {
    referenceNode: root,
    pointerBeforeReferenceNode: true,
  }

  function _filter(node) {
    return filter ? filter(node) === 1 : true
  }

  function _show(node) {
    return whatToShow >> node.nodeType - 1 & 1 === 1
  }

  return create({}, {
    root: {
      value: root,
    },
    referenceNode: {
      get: function referenceNode() {
        return data.referenceNode
      },
    },
    pointerBeforeReferenceNode: {
      get: function pointerBeforeReferenceNode() {
        return data.pointerBeforeReferenceNode
      },
    },
    whatToShow: {
      value: whatToShow
    },
    filter: {
      value: filter
    },
    nextNode: {
      value: function nextNode() {
        let node = data.referenceNode
        let before = data.pointerBeforeReferenceNode

        while(true) {
          if (before)
            before = false
          else
            node = successor(node, root)

          if (node === null)
            return null

          if (_show(node) && _filter(node))
            break
        }

        data.referenceNode = node
        data.pointerBeforeReferenceNode = before

        return node
      },
    },
    previousNode: {
      value: function previousNode() {
        let before = data.pointerBeforeReferenceNode
        let node = data.referenceNode

        while (true) {
          if (!before)
            before = true
          else
            node = predecessor(node, data.root)

          if (node === null)
            return null

          if (_show(node) && _filter(node))
            break
        }

        data.referenceNode = node
        data.pointerBeforeReferenceNode = before

        return node
      },
    },
    detach: {
      value: function detach() {},
    },
    toString: {
      value: function toString() {
        return '[object NodeIterator]'
      }
    },
  })
}


function wrapNodeIterator(iter) {
  const data = {
    referenceNode: iter.root,
    pointerBeforeReferenceNode: true,
  }

  const prototype = getPrototypeOf(iter)
  const wrapperPrototype = create(prototype, {
    root: {
      get: function root() {
        return iter.root
      },
    },
    referenceNode: {
      get: function referenceNode() {
        return data.referenceNode
      },
    },
    pointerBeforeReferenceNode: {
      get: function pointerBeforeReferenceNode() {
        return data.pointerBeforeReferenceNode
      },
    },
    whatToShow: {
      get: function whatToShow() {
        return iter.whatToShow
      },
    },
    filter: {
      get: function filter() {
        return iter.filter
      },
    },
    nextNode: {
      value: function nextNode() {
        const result = iter.nextNode()

        if (result === null)
          return null

        data.referenceNode = result
        data.pointerBeforeReferenceNode = false

        return data.referenceNode
      },
    },
    previousNode: {
      value: function previousNode() {
        const result = iter.previousNode()

        if (result === null)
          return null

        data.referenceNode = result
        data.pointerBeforeReferenceNode = true

        return data.referenceNode
      },
    },
    detach: {
      value: function detach() {},
    },
    toString: {
      value: function toString() {
        return '[object NodeIterator]'
      }
    },
  })

  return create(wrapperPrototype)
}

return createNodeIterator;

})();