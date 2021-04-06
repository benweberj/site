import React from 'react';

// inside a d.ts file, we can't have any actual code, just
// type definitions


// <XXXProps, any> = <props type, state type>
export interface XXXProps {

}

declare class XXX extends React.Component<XXXProps, any> {}

export default XXX