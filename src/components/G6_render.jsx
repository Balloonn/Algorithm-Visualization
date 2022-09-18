import G6 from '@antv/g6';
import DataGraph from './data/dataGraph';

const G6_render = (data, id) => {

      let nodeCount = data.nodes.length;
      let edgeCount = data.edges.length;
        G6.registerBehavior('click-add-edge', {
          getEvents() {
            return {
              'node:click': 'onClick',
              mousemove: 'onMousemove',
              'edge:click': 'onEdgeClick' // 点击空白处，取消边
            };
          },
          onClick(ev) {
            const node = ev.item;
            const graph = this.graph;
            const point = {
              x: ev.x,
              y: ev.y
            };
            const model = node.getModel();
            
            if (this.addingEdge && this.edge) {
              graph.updateItem(this.edge, {
                target: model.id
              }); 
              graph.updateItem(this.edge2, {
                source: model.id
              }); 
              
              data.edges.push({
                source: this.edge._cfg.source._cfg.id,
                target: this.edge._cfg.target._cfg.id,
                id: this.edge._cfg.id
              });
              data.edges.push({
                source: this.edge2._cfg.source._cfg.id,
                target: this.edge2._cfg.target._cfg.id,
                id: this.edge2._cfg.id
              });

              console.log(DataGraph.state);
              this.edge = null;
              this.addingEdge = false;
            } else {
              this.edge = graph.addItem('edge', {
                source: model.id,
                target: point,
                id: `edge${edgeCount}`,
              });
              edgeCount++;
              this.edge2 = graph.addItem('edge', {
                source: point,
                target: model.id,
                id: `edge${edgeCount}`,
              });
              edgeCount++;
            this.addingEdge = true;
            }
          },
          onMousemove(ev) {
            const point = {
              x: ev.x,
              y: ev.y
            };
            if (this.addingEdge && this.edge) {
              this.graph.updateItem(this.edge, {
                target: point
              });
            }
          },
          onEdgeClick(ev) {
            const currentEdge = ev.item;
            // 拖拽过程中，点击会点击到新增的边上
            if (this.addingEdge && this.edge == currentEdge) {
              graph.removeItem(this.edge);
              graph.removeItem(this.edge2);
              edgeCount-=2;
              this.edge = null;
              this.addingEdge = false;
            }
          }
        });

      G6.registerBehavior('click-add-node', {
        getEvents() {
          return {
            'canvas:click': 'onClick'
          };
        },
        onClick(ev) {
          const graph = this.graph;
          const node = this.graph.addItem('node', {
            x: ev.canvasX,
            y: ev.canvasY,
            id: `${nodeCount}`, // 生成唯一的 id
            label: `${nodeCount}`,
          });
          data.nodes.push({
            id: `${nodeCount}`,
            x: ev.canvasX,
            y: ev.canvasY,
            edges: [],
            label: `${nodeCount}`,
          })
          nodeCount++;
          console.log(DataGraph.state);
        }
      });

      const graph = new G6.Graph({
        container: `${id}`, // 指定图画布的容器 id，与第 9 行的容器对应
        // 画布宽高
        width: 1280,
        height: 720,
        fitViewPadding: [20, 50, 50, 20],
        modes: {
          default:['drag-node', 'click-select'],
          addNode:['click-add-node', 'click-select'],
          addEdge:['click-add-edge', 'click-select'],
        },
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
            startArrow: true,
          },
          color: '#DDD0C8',
          size:1.5,
        }
      });

      // 读取数据
      graph.data(data);
      // 渲染图
      graph.render();

      document.getElementById('selector').addEventListener('change', e => {
        const value = e.target.value;
        graph.setMode(value);
      })
}

export default G6_render