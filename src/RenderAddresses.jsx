function RenderAddresses(props) {
  if (!props.addresses || props.addresses.length) {
    return <li>No {props.type} addresses held.</li>;
  }

  console.log(props.addresses, props.type);

  return props.addresses.map((item) => {
    console.log(item);
    return (
      <li>
        {item.address1}
        <br />
        {item.address2}
        <br />
        {item.city}
        <br />
        {item.state}
        <br />
        {item.country}
      </li>
    );
  });
}

export default RenderAddresses;
