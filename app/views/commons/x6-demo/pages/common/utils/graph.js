export function graphPointToOffsetPoint(graph, graphPoint, containerElem) {
  if (graph) {
    const point = graph.localToPage({ x: graphPoint.x, y: graphPoint.y });
    const clientRect = containerElem?.getBoundingClientRect();
    const y = point.y - (clientRect?.y || 0);
    const x = point.x - (clientRect?.x || 0);
    return { x, y };
  }
  return { x: 0, y: 0 };
}
