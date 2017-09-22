import { h } from 'preact/src/h';
import { Component } from 'preact/src/component';

export default class ExplorerItemRepository extends Component {
  render(props) {
    const { id, name } = props;
    
    return (
      <a class="item" data-id={id} data-type="repository">
        <i class="folder icon"></i>
        <div class="content">
          <div class="header">{name}</div>
          <div class="list"></div>
        </div>
      </a>
    )
  }
}