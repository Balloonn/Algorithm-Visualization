import G6 from '@antv/g6';
import update_adjlis from './utils/utils';

const G6_render_graph = (data, id, dataStructure) => {

      let edgeCount = data.edges.length;
      G6.registerBehavior('click-add-edge1', {
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
            
            if(this.edge._cfg.source._cfg.id != this.edge._cfg.target._cfg.id)
            {
              let flag1 = true;
              for(let i = 0; i < data.edges.length; i ++)
              {
                if(data.edges[i].source == this.edge._cfg.source._cfg.id && data.edges[i].target === this.edge._cfg.target._cfg.id) {
                  flag1 = false;
                }
              }
              
              if(flag1) {
                data.edges.push({
                  source: this.edge._cfg.source._cfg.id,
                  target: this.edge._cfg.target._cfg.id,
                  id: this.edge._cfg.id
                });
                dataStructure.addEdge(this.edge._cfg.source._cfg.id,this.edge._cfg.target._cfg.id,1);
              }
              update_adjlis();
            }
            
            this.edge = null;
            this.addingEdge = false;
          } else {
            this.edge = graph.addItem('edge', {
              source: model.id,
              target: point,
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
          if (this.addingEdge && this.edge === currentEdge) {
            graph.removeItem(this.edge);
            this.edge = null;
            this.addingEdge = false;
          }
        }
      }); 

        G6.registerBehavior('click-add-edge2', {
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
              
              if(this.edge._cfg.source._cfg.id != this.edge._cfg.target._cfg.id)
              {
                let flag1 = true, flag2 = true;
                for(let i = 0; i < data.edges.length; i ++)
                {
                  if(data.edges[i].source == this.edge._cfg.source._cfg.id && data.edges[i].target === this.edge._cfg.target._cfg.id) {
                    flag1 = false;
                  }
                  
                  if(data.edges[i].target == this.edge._cfg.source._cfg.id && data.edges[i].source === this.edge._cfg.target._cfg.id) {
                    flag2 = false;
                  }
                }
                
                if(flag1) {
                  data.edges.push({
                    source: this.edge._cfg.source._cfg.id,
                    target: this.edge._cfg.target._cfg.id,
                    id: this.edge._cfg.id
                  });
                  dataStructure.addEdge(this.edge._cfg.source._cfg.id,this.edge._cfg.target._cfg.id,1);
                }
                
                if(flag2) {
                  data.edges.push({
                    source: this.edge._cfg.target._cfg.id,
                    target: this.edge._cfg.source._cfg.id,
                    id: this.edge2._cfg.id
                  });
                  dataStructure.addEdge(this.edge._cfg.target._cfg.id,this.edge._cfg.source._cfg.id,1);
                }
                update_adjlis();
              }
              
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
            if (this.addingEdge && this.edge === currentEdge) {
              graph.removeItem(this.edge);
              graph.removeItem(this.edge2);
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
          let flag = false;
          let newid = 0;
          while(!flag) {
            newid++;
            flag = true;
            for(let i = 0; i < data.nodes.length; i ++) {
              if(data.nodes[i].id == newid) {
                flag = false;
              }
            }
          }
          data.nodes.push({
            id: `${newid}`,
            x: ev.canvasX,
            y: ev.canvasY,
            edges: [],
            label: `${newid}`,
          })
          this.graph.addItem('node', {
            x: ev.canvasX,
            y: ev.canvasY,
            id: `${newid}`, 
            label: `${newid}`,
          });
          dataStructure.addNode(newid);
          update_adjlis();
        }
      });

      G6.registerBehavior('click-delete-node', {
        getEvents() {
          return {
            'node:click': 'onClick'
          };
        },
        onClick(ev) {
          const node = ev.item;
          const model = node.getModel();
          
          for(let i = 0; i < data.nodes.length; i ++) {
            if(model.id == data.nodes[i].id) {
              data.nodes.splice(i,1);
            }
          }
          dataStructure.deleteNode(model.id);
          
          for(let i = 0; i < data.edges.length; i ++) {
            if(model.id == data.edges[i].source || model.id == data.edges[i].target) {
              data.edges.splice(i,1);
              i--;
            }
          }

          for(let i = 0; i < dataStructure.nodes.length; i ++) {
            let node = dataStructure.nodes[i];
            if(node.id == model.id) {
              dataStructure.nodes.splice(i,1);
            }
            else {
              for(let j = 0; j < node.adjList.length; j ++) {
                if(node.adjList[j] == model.id) {
                  node.adjList.splice(j,1);
                }
              }
            }
          }
          graph.removeItem(node);
          update_adjlis();
        }
      })

      G6.registerBehavior('click-delete-edge', {
        getEvents() {
          return {
            'edge:click': 'onClick'
          }
        },
        onClick(ev) {
          const edge = ev.item;
          const model = edge.getModel();
          for(let i = 0; i < data.edges.length; i ++) {
            if(data.edges[i].source == model.source && data.edges[i].target == model.target) {
              data.edges.splice(i,1);
            }
            if(data.edges[i].source == model.target && data.edges[i].target == model.source) {
              data.edges.splice(i,1);
            }
          }

          for(let i = 0; i < dataStructure.nodes.length; i ++) {
            const node = dataStructure.nodes[i];
            if(node.id == model.source) {
              for(let j = 0; j < node.adjList.length; j ++) {
                if(node.adjList[j] == model.target) {
                  node.adjList.splice(j,1);
                }
              }
            }
            if(node.id == model.target) {
              for(let j = 0; j < node.adjList.length; j ++) {
                if(node.adjList[j] == model.source) {
                  node.adjList.splice(j,1);
                }
              }
            }
          }

          graph.remove(edge);
          
          update_adjlis();
        }
      })
      const graph = new G6.Graph({
        container: `${id}`, 
        width: 1280,
        height: 960,
        fitViewPadding: [20, 50, 50, 20],
        modes: {
          default:['drag-node', 'click-select'],
          addNode:['click-add-node', 'click-select'],
          addEdge1:['click-add-edge1', 'click-select'],
          addEdge2:['click-add-edge2', 'click-select'],
          deleteNode:['click-delete-node', 'click-select'],
          deleteEdge:['click-delete-edge', 'click-select'],
        },
        defaultNode: {
          size:50,
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

      

      document.getElementById('selector').addEventListener('change', e => {
        const value = e.target.value;
        graph.setMode(value);
      })

      return graph;
}

export default G6_render_graph;