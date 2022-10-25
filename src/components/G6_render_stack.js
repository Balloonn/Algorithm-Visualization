import G6 from '@antv/g6';

const G6_render_stack = (data, id, dataStructure) => {

      const graph = new G6.Graph({
        container: `${id}`, 
        width: 1280,
        height: 960,
        fitViewPadding: [20, 50, 50, 20],
        defaultNode: {
          size:40,
          style: {
            fill: '#EAB4C4',
            stroke: '#F3F0E7',
            lineWidth: 1,
          },
        },
        defaultEdge: {
          style: {
            endArrow: true,
          },
          color: '#DDD0C8',
          size:2.5,
        }
      });

      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();

      return graph;
}

export default G6_render_stack