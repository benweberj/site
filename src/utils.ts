
// return styles based on mx, mr, mt, px, pt, ... props
export const marginPadding = props => {
  return ({
    margin: props.m && props.m,
    marginLeft: props.ml ? props.ml : props.mx && props.mx,
    marginRight: props.mr ? props.mr : props.mx && props.mx,
    marginTop: props.mt ? props.mt : props.my && props.my,
    marginBottom: props.mb ? props.mb : props.my && props.my,

    padding: props.p && props.p,
    paddingLeft: props.pl ? props.pl : props.px && props.px,
    paddingRight: props.pr ? props.pr : props.px && props.px,
    paddingTop: props.pt ? props.pt : props.py && props.py,
    paddingBottom: props.pb ? props.pb : props.py && props.py,
  })
}

// exporting interface because components that use marginPadding() don't define the
// margin and padding prpps
export interface MPInterface {
  m?: string | number;
  ml?: string | number;
  mr?: string | number;
  mt?: string | number;
  mb?: string | number;

  p?: string | number;
  pl?: string | number;
  pr?: string | number;
  pt?: string | number;
  pb?: string | number;
}