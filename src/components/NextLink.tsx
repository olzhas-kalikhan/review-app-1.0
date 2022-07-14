import React from "react";
import DefaultNextLink, { LinkProps } from "next/link";
import { Link } from "@chakra-ui/react";

interface NextLinkProps extends LinkProps {
  children: any;
}

const NextLink = (props: NextLinkProps) => {
  return (
    <DefaultNextLink passHref {...props}>
      <Link>{props.children}</Link>
    </DefaultNextLink>
  );
};

export default NextLink;
