import Add from "./Add";
import ConditionalOutput from "./ConditionalOutput";
import DynamicStyling from "./DynamicStyling";
import Highlight from "./Highlight";
import JavaScript from "./Javascript";
import Styles from "./Styles";
import PathParameters from "./routing/PathParameters";
import TodoList from "./todos/TodoList";

function Assignment3() {
  return (
    <div>
      <h1>Assignment 3</h1>
      <ConditionalOutput />
      <Styles />
      <DynamicStyling />
      <PathParameters />
      <JavaScript/>
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>
      <Add a={3} b={4} />
      <TodoList />
    </div>
  );
}
export default Assignment3;