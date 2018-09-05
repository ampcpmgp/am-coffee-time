import './overlay.tag'
import './icons/octocat.tag'

<parts-help>
  <parts-overlay onclick={closeHelp}></parts-overlay>
  <section>
    <header>
      Keyboard Shortcuts
    </header>
    <div>
      <kbd>?</kbd><span>Open this window.</span>
    </div>
    <div>
      <kbd>Esc</kbd><span>Close this window.</span>
    </div>
    <div>
      <kbd>1</kbd>-<kbd>8</kbd><span>Fold [1 -  8] depth tree node.</span>
    </div>
    <div>
      <kbd>9</kbd><span>Fold all tree node.</span>
    </div>
    <div>
      <kbd>0</kbd><span>Unfold all tree node.</span>
    </div>
    <footer>
      <a href="https://github.com/ampcpmgp/am-mocktimes" target="_blank">
        <parts-icons-octocat></parts-icons-octocat>
      </a>
    </footer>
  </section>
  <style type="less">
    > section {
      position: fixed;
      top: 40px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 80%;
      min-height: 300px;
      background: white;
      padding: 16px;
      border-radius: 10px;

      > header {
        padding: 16px;
        margin: -16px -16px 16px;
        border-bottom: 1px solid #ccc;
      }

      > div {
        line-height: 1.4;

        > kbd {
          display: inline-block;
          padding: 3px 5px;
          font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
          line-height: 10px;
          color: #444d56;
          vertical-align: middle;
          background-color: #fafbfc;
          border: solid 1px #d1d5da;
          border-bottom-color: #c6cbd1;
          border-radius: 3px;
          box-shadow: inset 0 -1px 0 #c6cbd1;
        }

        > span {
          margin-left: 10px;
          font-size: 12px;
          color: #333;
        }
      }

      > footer {
        > a {
          display: inline-block;
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 80px;
          height: 80px;

          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  </style>
  <script>
    import {
      closeHelp
    } from '../../actions'

    Object.assign(this, {
      closeHelp
    })
  </script>
</parts-help>
