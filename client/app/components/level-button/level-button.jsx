import React from 'react';
import classnames from 'classnames/bind';
import Text from '../text';
import styles from './level-button.scss';

const cx = classnames.bind(styles);

class LevelButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick() {
    const { level, onClick } = this.props;
    onClick(level);
  }

  handleMouseEnter() {
    this.setState({
      isHovered: true,
    });
  }

  handleMouseLeave() {
    this.setState({
      isHovered: false,
    });
  }

  render() {
    const { level } = this.props;
    const { isHovered } = this.state;

    return (
      <div
        className={cx('level-button', {
          [`level-button--${level}`]: level,
          'level-button--active': isHovered,

        })}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Text text={level} center size="medium" cases="uppercase" weight="bold" color="dark-blue" />
      </div>
    );
  }
}

export default LevelButton;
