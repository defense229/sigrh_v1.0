function useStyle(
  props: any,
  className: string,
  style: Record<string, string>
) {
  const _props = {
    ...props,
    className: className + (props.className ? ' ' + props.className : ''),
    style: props.style ? { ...style, ...props.style } : style,
  };
  return _props;
}

export default useStyle;
