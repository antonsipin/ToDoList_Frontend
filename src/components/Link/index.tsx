import React from 'react';
import { navigateToUrl } from 'single-spa';

type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

interface LinkProps extends Omit<AnchorProps, 'href'> {
    to: string;
    toOpts?: Parameters<typeof navigateToUrl>[1];
}

export const Link = (props: LinkProps) => {
    return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
            {...props}
            href={props.to}
            onClick={(e) => {
                if (props.onClick) {
                    props.onClick(e);
                }
                e.preventDefault();
                navigateToUrl(props.to, props.toOpts);
            }}
        />
    );
};
